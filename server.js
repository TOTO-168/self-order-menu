const { createReadStream } = require("node:fs");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const STATUS_FILE = path.join(ROOT, "quickclick-status.json");
const SYNC_INTERVAL_MS = 60 * 60 * 1000;
const SHOP_ID = "P_QKlRKwbXr";
const API_BASE = "https://order.quickclick.cc/apis";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function isSoldOut(item) {
  const now = Math.floor(Date.now() / 1000);
  const isHidden = Number(item.isHidden || 0) === 1;
  const isInvisible = "isVisibled" in item && Number(item.isVisibled) !== 1;
  const hasStockControl = Number(item.isStock || 0) === 1;
  const noStock =
    hasStockControl &&
    item.numOfRemain !== null &&
    item.numOfRemain !== undefined &&
    Number(item.numOfRemain) <= 0;
  const soldOutUntilAt = Number(item.soldOutUntilAt || 0);

  return isHidden || isInvisible || noStock || soldOutUntilAt > now;
}

function localizedLabel(item, fallbackKey) {
  return item.data?.["zh-TW"]?.label || item.productLocale?.["zh-TW"]?.name || item[fallbackKey] || "";
}

async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`QuickClick API ${response.status}: ${endpoint}`);
  }
  return response.json();
}

async function buildQuickClickStatus() {
  const shop = await apiGet(`/shops/${SHOP_ID}`);
  const menu = await apiGet(`/shops/${SHOP_ID}/menu?mt=toGo&tn=`);
  const channelId = shop.isChannelShop ? shop.channelAccountId : shop.accountId;
  const products = await apiGet(
    `/shops/${SHOP_ID}/menu/${menu.menuId}/products?mt=toGo&tn=&channelId=${channelId}`
  );

  const status = {
    updatedAt: new Date().toISOString(),
    sourceUrl: `https://order.quickclick.cc/tw/food/${SHOP_ID}/`,
    shopId: SHOP_ID,
    shopName: shop.name,
    menuId: menu.menuId,
    products: {},
    addons: {},
  };

  for (const product of products) {
    const productId = String(product.productId);
    status.products[productId] = {
      id: productId,
      name: localizedLabel(product, "productName"),
      price: Number(product.productAmount || 0),
      soldOut: isSoldOut(product),
      isVisibled: product.isVisibled,
      isStock: product.isStock,
      numOfRemain: product.numOfRemain,
      soldOutUntilAt: product.soldOutUntilAt,
    };

    const addonGroups = await apiGet(`/products/${product.productId}/addons`);
    addonGroups.forEach((group) => {
      (group.values || []).forEach((value) => {
        const addonId = String(value.id);
        status.addons[addonId] = {
          id: addonId,
          groupId: String(group.id),
          groupName: localizedLabel(group, "label"),
          name: localizedLabel(value, "label"),
          price: Number(value.price || 0),
          soldOut: isSoldOut(value),
          isVisibled: value.isVisibled,
          isHidden: value.isHidden,
          numOfRemain: value.numOfRemain,
          soldOutUntilAt: value.soldOutUntilAt,
        };
      });
    });
  }

  return status;
}

async function syncQuickClickStatus({ failOnError = false } = {}) {
  try {
    const status = await buildQuickClickStatus();
    await fs.writeFile(STATUS_FILE, `${JSON.stringify(status, null, 2)}\n`);
    console.log(
      `[sync] ${status.updatedAt} products=${Object.keys(status.products).length} addons=${Object.keys(status.addons).length}`
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
  await syncQuickClickStatus();
  setInterval(syncQuickClickStatus, SYNC_INTERVAL_MS);

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
  syncQuickClickStatus({ failOnError: true });
} else {
  main();
}
