const { createReadStream } = require("node:fs");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const { URL } = require("node:url");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const STATUS_FILE = path.join(ROOT, "imenu-status.json");
const SYNC_INTERVAL_MS = 60 * 60 * 1000;
const COMPANY_ID = 4030;
const STORE_ID = 10692;
const SOURCE_URL = "https://imenu.com.tw/PokeHouse/PH_SanSia/menu";
const API_BASE = "https://api.idelivery.com.tw";
const API_SECRET = "NzJhMDZiMzE0NWU0NDlkMGY0ZDMzYTJiMTE5OTYzMGQ0YmU1M2M1ZA==";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function imenuSourceKey(...parts) {
  return parts.map((part) => String(part).trim()).join("::");
}

function statusIsUnavailable(status) {
  const value = Number(status);
  return Number.isFinite(value) && value !== 1;
}

function selectedBasePrice(item) {
  if (!Array.isArray(item.base_price) || item.base_price.length === 0) {
    return null;
  }

  return item.base_price.find((basePrice) => basePrice.selected) || item.base_price[0];
}

function entityPrice(item) {
  const basePrice = selectedBasePrice(item);
  const price = basePrice?.price ?? item.price ?? item.extra_price;
  const value = Number(price);
  return Number.isFinite(value) ? value : null;
}

function entityStock(item) {
  const stock = selectedBasePrice(item)?.stock ?? item.stock;
  if (stock === null || stock === undefined) return null;

  const value = Number(stock);
  return Number.isFinite(value) ? value : null;
}

function isSoldOut(item) {
  const stock = entityStock(item);
  return (
    statusIsUnavailable(item.sold_status) ||
    statusIsUnavailable(selectedBasePrice(item)?.sold_status) ||
    (stock !== null && stock <= 0)
  );
}

function toStatusEntity(item, extra = {}) {
  return {
    ...extra,
    id: item.id,
    name: item.title,
    price: entityPrice(item),
    soldOut: isSoldOut(item),
    soldStatus: item.sold_status ?? null,
    stock: entityStock(item),
    hidden: Boolean(item.hidden),
  };
}

async function apiGet(endpoint, query = {}) {
  const url = new URL(endpoint, API_BASE);
  Object.entries({ ...query, lang: "zh_TW" }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: API_SECRET,
      "Content-Type": "application/json;charset=utf8",
      "Request-Id": randomUUID().replaceAll("-", ""),
    },
  });

  if (!response.ok) {
    throw new Error(`iMenu API ${response.status}: ${url.pathname}`);
  }

  const payload = await response.json();
  if (payload.code !== 200 || payload.status === false) {
    throw new Error(payload.message || `iMenu API rejected ${url.pathname}`);
  }

  return payload.response;
}

async function buildImenuStatus() {
  const [storeConfig, menu] = await Promise.all([
    apiGet(`/company/${COMPANY_ID}/config`, { store_id: STORE_ID, from: "IMENU" }),
    apiGet(`/store/${STORE_ID}/menu`, { from: "IMENU", t: Date.now() }),
  ]);
  const store = storeConfig.list?.find((item) => Number(item.id) === STORE_ID) || storeConfig.list?.[0];

  const status = {
    updatedAt: new Date().toISOString(),
    sourceUrl: SOURCE_URL,
    apiBase: API_BASE,
    companyId: COMPANY_ID,
    storeId: STORE_ID,
    storeName: store?.name || "PokéHouse 波奇好食(三峽店)",
    menuVersion: menu.version,
    sets: {},
    items: {},
    details: {},
  };

  for (const category of menu.data || []) {
    for (const set of category.sets || []) {
      status.sets[imenuSourceKey(category.category_name, set.title)] = toStatusEntity(set, {
        category: category.category_name,
        description: set.description || "",
      });

      for (const detail of set.detail || []) {
        for (const item of detail.items || []) {
          status.details[imenuSourceKey(set.title, detail.name, item.title)] = toStatusEntity(item, {
            setId: set.id,
            setName: set.title,
            detailId: detail.id,
            detailName: detail.name,
          });
        }
      }
    }

    for (const item of category.items || []) {
      status.items[imenuSourceKey(category.category_name, item.title)] = toStatusEntity(item, {
        category: category.category_name,
        description: item.description || "",
      });
    }
  }

  status.counts = {
    sets: Object.keys(status.sets).length,
    items: Object.keys(status.items).length,
    details: Object.keys(status.details).length,
  };

  return status;
}

async function syncImenuStatus({ failOnError = false } = {}) {
  try {
    const status = await buildImenuStatus();
    await fs.writeFile(STATUS_FILE, `${JSON.stringify(status, null, 2)}\n`);
    console.log(
      `[sync] ${status.updatedAt} sets=${status.counts.sets} items=${status.counts.items} details=${status.counts.details}`
    );
  } catch (error) {
    console.error(`[sync] failed: ${error.message}`);
    if (failOnError) {
      process.exitCode = 1;
    }
  }
}

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://${HOST}:${PORT}`);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  const resolved = path.resolve(ROOT, `.${decodeURIComponent(pathname)}`);

  if (resolved !== ROOT && !resolved.startsWith(`${ROOT}${path.sep}`)) {
    return null;
  }

  return resolved;
}

async function serveFile(request, response) {
  const filePath = resolveRequestPath(request.url);
  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error("Not a file");

    response.writeHead(200, {
      "Cache-Control": filePath === STATUS_FILE ? "no-store" : "no-cache",
      "Content-Length": stat.size,
      "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

async function main() {
  await syncImenuStatus();
  setInterval(syncImenuStatus, SYNC_INTERVAL_MS);

  http.createServer((request, response) => {
    serveFile(request, response).catch((error) => {
      response.writeHead(500);
      response.end(error.message);
    });
  }).listen(PORT, HOST, () => {
    console.log(`Serving on http://${HOST}:${PORT}/`);
  });
}

if (process.argv.includes("--sync-only")) {
  syncImenuStatus({ failOnError: true });
} else {
  main();
}
