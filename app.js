const APP_VERSION = "v2026.06.23.1";
const QUICKCLICK_STATUS_PATH = "./quickclick-status.json";
const QUICKCLICK_SYNC_INTERVAL_MS = 60 * 60 * 1000;

function quickProduct(id) {
  return { type: "product", id: String(id) };
}

function quickAddon(id) {
  return { type: "addon", id: String(id) };
}

const takeAPokeCustomNames = ["自選 Poke Bowl"];
const takeAPokeBaseOptions = [
  { name: "藜麥飯", price: 0, quickClick: quickAddon(47622466) },
  { name: "新鮮生菜", price: 0, quickClick: quickAddon(47622465) },
  { name: "飯菜各半", price: 0, quickClick: quickAddon(47622467) },
  { name: "藜麥飯1/2(無生菜)", price: 0, quickClick: quickAddon(47622523) },
];
const takeAPokeSideOptions = [
  { name: "牛番茄", price: 0, quickClick: quickAddon(47622469) },
  { name: "小黃瓜", price: 0, quickClick: quickAddon(47622468) },
  { name: "水煮蛋半顆", price: 0, quickClick: quickAddon(47622470) },
  { name: "毛豆", price: 0, quickClick: quickAddon(47622472) },
  { name: "花椰菜", price: 0, quickClick: quickAddon(47622471) },
  { name: "豆腐", price: 0, quickClick: quickAddon(47622473) },
  { name: "海帶芽", price: 0, quickClick: quickAddon(47622474) },
  { name: "蘋果丁", price: 0, quickClick: quickAddon(47622460) },
  { name: "玉米筍", price: 0, quickClick: quickAddon(47622461) },
  { name: "菠菜", price: 0, quickClick: quickAddon(47622462) },
  { name: "泡菜", price: 0, quickClick: quickAddon(47622463) },
  { name: "和風裙帶絲", price: 0, quickClick: quickAddon(47622464) },
  { name: "墨西哥玉米粒(含紫洋蔥)", price: 0, quickClick: quickAddon(47622500) },
];
const takeAPokeProteinOptions = [
  { name: "生鮭魚50g", price: 80, quickClick: quickAddon(47622475) },
  { name: "生醃漬鮪魚50g", price: 75, quickClick: quickAddon(47622476) },
  { name: "生甜蝦10隻", price: 70, quickClick: quickAddon(47622477) },
  { name: "鮮蝦5隻", price: 70, quickClick: quickAddon(47622478) },
  { name: "山葵章魚50g", price: 50, quickClick: quickAddon(47622479) },
  { name: "雞胸肉50g", price: 30, quickClick: quickAddon(47622480) },
  { name: "雞胸肉100g", price: 55, quickClick: quickAddon(47622482) },
  { name: "骰子牛50g", price: 40, quickClick: quickAddon(47622481) },
  { name: "骰子牛100g", price: 80, quickClick: quickAddon(47622483) },
];
const takeAPokeSauceOptions = [
  { name: "醬油哇沙米", price: 0, quickClick: quickAddon(47622484) },
  { name: "柚子胡椒", price: 0, quickClick: quickAddon(47622485) },
  { name: "胡麻醬", price: 0, quickClick: quickAddon(47622486) },
  { name: "辣味美乃滋", price: 0, quickClick: quickAddon(47622487) },
  { name: "無須加醬", price: 0, quickClick: quickAddon(47622518) },
];
const takeAPokeToppingOptions = [
  { name: "紫洋蔥", price: 0, quickClick: quickAddon(47622511) },
  { name: "蔥花", price: 0, quickClick: quickAddon(47622506) },
  { name: "黑芝麻", price: 0, quickClick: quickAddon(47622507) },
  { name: "七味粉", price: 0, quickClick: quickAddon(47622508) },
  { name: "咔辣姆久", price: 0, quickClick: quickAddon(47622509) },
  { name: "鰹魚香鬆", price: 0, quickClick: quickAddon(47622510) },
  { name: "無須撒料", price: 0, quickClick: quickAddon(47622521) },
];
const takeAPokeExtraBaseOptions = [
  { name: "加飯", price: 15, quickClick: quickAddon(47622488) },
  { name: "加生菜", price: 20, quickClick: quickAddon(47622490) },
];
const takeAPokeExtraSideOptions = [
  { name: "牛番茄", price: 10, quickClick: quickAddon(47622491) },
  { name: "小黃瓜", price: 10, quickClick: quickAddon(47622489) },
  { name: "水煮蛋半顆", price: 10, quickClick: quickAddon(47622492) },
  { name: "毛豆", price: 10, quickClick: quickAddon(47622503) },
  { name: "花椰菜", price: 10, quickClick: quickAddon(47622493) },
  { name: "豆腐", price: 10, quickClick: quickAddon(47622496) },
  { name: "海帶芽", price: 10, quickClick: quickAddon(47622494) },
  { name: "蘋果丁", price: 10, quickClick: quickAddon(47622495) },
  { name: "玉米筍", price: 10, quickClick: quickAddon(47622497) },
  { name: "菠菜", price: 10, quickClick: quickAddon(47622498) },
  { name: "泡菜", price: 10, quickClick: quickAddon(47622499) },
  { name: "和風裙帶絲", price: 10, quickClick: quickAddon(47622519) },
  { name: "墨西哥玉米粒(含紫洋蔥)", price: 10, quickClick: quickAddon(47622520) },
];
const takeAPokeExtraSauceOptions = [
  { name: "醬油哇沙米", price: 10, quickClick: quickAddon(47622501) },
  { name: "柚子胡椒", price: 15, quickClick: quickAddon(47622502) },
  { name: "胡麻醬", price: 15, quickClick: quickAddon(47622504) },
  { name: "辣味美乃滋", price: 20, quickClick: quickAddon(47622505) },
];
const takeAPokeExtraToppingOptions = [
  { name: "紫洋蔥", price: 5, quickClick: quickAddon(47622512) },
  { name: "蔥花", price: 5, quickClick: quickAddon(47622513) },
  { name: "黑芝麻", price: 5, quickClick: quickAddon(47622515) },
  { name: "七味粉", price: 5, quickClick: quickAddon(47622514) },
  { name: "咔辣姆久", price: 5, quickClick: quickAddon(47622517) },
  { name: "鰹魚香鬆", price: 5, quickClick: quickAddon(47622516) },
];

const restaurants = [
  {
    id: "take-a-poke-sansia",
    name: "波奇來一下 Take A Poke 三峽店",
    tag: "波奇碗 / 健康餐",
    meta: "新北市三峽區國際一街31-1號1樓",
    syncMeta: "",
    color: "#0f7d68",
    sections: [
      {
        id: "main",
        title: "餐點",
        type: "single",
        required: true,
        options: [
          {
            name: "自選 Poke Bowl",
            price: 100,
            detail: "含1份基底、5樣佐菜、1種醬汁、3種撒料",
            quickClick: quickProduct(73081058),
          },
          {
            name: "隨便來碗 Poke Bowl",
            price: 200,
            detail: "店家搭配",
            quickClick: quickProduct(73081059),
          },
          {
            name: "健身巨巨 Poke Bowl",
            price: 150,
            quickClick: quickProduct(73081061),
          },
          {
            name: "輕盈低卡 Poke Bowl",
            price: 165,
            quickClick: quickProduct(73081063),
          },
          {
            name: "蔬食友好 Poke Bowl",
            price: 125,
            quickClick: quickProduct(73081065),
          },
        ],
      },
      {
        id: "base",
        title: "基底",
        type: "single",
        required: true,
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeBaseOptions,
      },
      {
        id: "sides",
        title: "佐菜",
        type: "multi",
        min: 5,
        max: 5,
        quantity: false,
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeSideOptions,
      },
      {
        id: "protein",
        title: "蛋白質加購",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeProteinOptions,
      },
      {
        id: "sauce",
        title: "醬料",
        type: "single",
        required: true,
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeSauceOptions,
      },
      {
        id: "toppings",
        title: "撒料",
        type: "multi",
        min: 3,
        max: 3,
        quantity: false,
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeToppingOptions,
      },
      {
        id: "extra-base",
        title: "加點基底",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeExtraBaseOptions,
      },
      {
        id: "extra-sides",
        title: "佐菜加購",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeExtraSideOptions,
      },
      {
        id: "extra-sauce",
        title: "醬料加購",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeExtraSauceOptions,
      },
      {
        id: "sauce-adjust",
        title: "醬料調整",
        type: "multi",
        max: 1,
        quantity: false,
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: [{ name: "醬少", price: 0, quickClick: quickAddon(47622522) }],
      },
      {
        id: "extra-toppings",
        title: "撒料加購",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: takeAPokeCustomNames },
        options: takeAPokeExtraToppingOptions,
      },
      {
        id: "drinks",
        title: "飲料",
        type: "multi",
        max: 6,
        options: [
          { name: "百香果醋飲", price: 15, quickClick: quickProduct(73081060) },
          { name: "葡萄水果醋飲", price: 15, quickClick: quickProduct(73081062) },
          { name: "蜜桃水果醋飲", price: 15, quickClick: quickProduct(73081064) },
          { name: "蘋果水果醋飲", price: 15, quickClick: quickProduct(73081066) },
          { name: "青梅水果醋飲", price: 15, quickClick: quickProduct(81737757) },
        ],
      },
      {
        id: "other",
        title: "其他",
        type: "multi",
        max: 2,
        options: [{ name: "自備餐盒", price: 0, quickClick: quickProduct(73081067) }],
      },
    ],
  },
  {
    id: "traditional-tofu-pudding",
    name: "山泉水豆花",
    tag: "豆花 / 甜品",
    meta: "豆花 $40，可選兩份料",
    color: "#7a6737",
    sections: [
      {
        id: "main",
        title: "餐點",
        type: "single",
        required: true,
        options: [
          { name: "豆花", price: 40, detail: "可選兩份料" },
          { name: "冰", price: 40, detail: "無豆花，可選兩份料" },
        ],
      },
      {
        id: "toppings",
        title: "配料",
        type: "multi",
        max: 2,
        quantity: false,
        options: [
          { name: "粉圓", price: 0 },
          { name: "綠豆", price: 0 },
          { name: "大紅豆", price: 0 },
          { name: "小紅豆", price: 0 },
          { name: "花生", price: 0 },
          { name: "薏仁", price: 0 },
          { name: "雪蓮子", price: 0 },
        ],
      },
      {
        id: "ice",
        title: "冰量",
        type: "single",
        required: true,
        appliesTo: { sectionId: "main", optionNames: ["豆花"] },
        options: [
          { name: "去冰", price: 0 },
          { name: "少冰", price: 0 },
          { name: "正常冰", price: 0 },
          { name: "多冰", price: 0 },
        ],
      },
    ],
  },
];

const state = {
  restaurantId: restaurants[0].id,
  customerName: "",
  note: "",
  selectionsByRestaurant: {},
  quickClickStatus: null,
};

const elements = {
  restaurantList: document.querySelector("#restaurantList"),
  restaurantCount: document.querySelector("#restaurantCount"),
  selectedRestaurantLabel: document.querySelector("#selectedRestaurantLabel"),
  restaurantMeta: document.querySelector("#restaurantMeta"),
  appVersionLabel: document.querySelector("#appVersionLabel"),
  customerName: document.querySelector("#customerName"),
  orderNote: document.querySelector("#orderNote"),
  menuForm: document.querySelector("#menuForm"),
  clearButton: document.querySelector("#clearButton"),
  summaryText: document.querySelector("#summaryText"),
  summaryStatus: document.querySelector("#summaryStatus"),
  orderTotal: document.querySelector("#orderTotal"),
  copyButton: document.querySelector("#copyButton"),
  jpgButton: document.querySelector("#jpgButton"),
  scrollTopButton: document.querySelector("#scrollTopButton"),
  scrollBottomButton: document.querySelector("#scrollBottomButton"),
  toast: document.querySelector("#toast"),
  previewPanel: document.querySelector("#previewPanel"),
  jpgPreview: document.querySelector("#jpgPreview"),
};

let toastTimer = null;

function getRestaurant() {
  return restaurants.find((restaurant) => restaurant.id === state.restaurantId);
}

function createEmptySelection(restaurant) {
  return restaurant.sections.reduce((selection, section) => {
    selection[section.id] = section.type === "multi" ? {} : "";
    return selection;
  }, {});
}

function getSelection(restaurant = getRestaurant()) {
  if (!state.selectionsByRestaurant[restaurant.id]) {
    state.selectionsByRestaurant[restaurant.id] = createEmptySelection(restaurant);
  }

  return state.selectionsByRestaurant[restaurant.id];
}

function formatPrice(price) {
  return `$${price.toLocaleString("zh-TW")}`;
}

function optionMeta(option, section) {
  const parts = [];

  if (option.price > 0) {
    parts.push(section.type === "single" ? formatPrice(option.price) : `+${formatPrice(option.price)}`);
  }

  if (option.detail) parts.push(option.detail);
  if (option.soldOut) parts.push("售完");

  return parts.join(" · ") || "包含";
}

function syncableOptions() {
  return restaurants.flatMap((restaurant) =>
    restaurant.sections.flatMap((section) =>
      section.options
        .filter((option) => option.quickClick)
        .map((option) => ({ restaurant, option }))
    )
  );
}

function applyQuickClickStatus(status) {
  state.quickClickStatus = status;
  const products = status.products || {};
  const addons = status.addons || {};

  syncableOptions().forEach(({ option }) => {
    const source =
      option.quickClick.type === "product"
        ? products[option.quickClick.id]
        : addons[option.quickClick.id];
    if (!source) return;

    option.soldOut = Boolean(source.soldOut);
    if (Number.isFinite(source.price)) {
      option.price = source.price;
    }
  });

  const restaurant = restaurants.find((item) => item.id === "take-a-poke-sansia");
  if (restaurant) {
    restaurant.syncMeta = status.updatedAt
      ? `同步 ${formatSyncTime(status.updatedAt)}`
      : "已同步";
  }
}

function formatSyncTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function loadQuickClickStatus({ silent = false } = {}) {
  try {
    const response = await fetch(`${QUICKCLICK_STATUS_PATH}?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const status = await response.json();
    applyQuickClickStatus(status);
    renderMenu();
    syncSummary();
    if (!silent) showToast("已同步 QuickClick 狀態");
  } catch {
    const restaurant = restaurants.find((item) => item.id === "take-a-poke-sansia");
    if (restaurant) restaurant.syncMeta = "同步失敗";
    renderMenu();
    if (!silent) showToast("QuickClick 狀態同步失敗");
  }
}

function renderRestaurants() {
  elements.restaurantCount.textContent = `${restaurants.length} 間`;
  elements.restaurantList.innerHTML = restaurants
    .map((restaurant) => {
      const isActive = restaurant.id === state.restaurantId;
      return `
        <button
          class="restaurant-button"
          type="button"
          role="tab"
          aria-selected="${isActive}"
          data-restaurant-id="${restaurant.id}"
          style="--restaurant-color: ${restaurant.color}"
        >
          <span class="restaurant-mark" aria-hidden="true"></span>
          <span>
            <span class="restaurant-name">${restaurant.name}</span>
            <span class="restaurant-tag">${restaurant.tag}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderMenu() {
  const restaurant = getRestaurant();
  const selection = getSelection(restaurant);
  normalizeSelection(restaurant, selection);
  document.documentElement.style.setProperty("--accent", restaurant.color);
  document.documentElement.style.setProperty("--accent-soft", softColor(restaurant.color));
  elements.selectedRestaurantLabel.textContent = restaurant.name;
  elements.restaurantMeta.textContent = [restaurant.meta, restaurant.syncMeta].filter(Boolean).join("｜");

  elements.menuForm.innerHTML = visibleSections(restaurant, selection)
    .map((section) => renderSection(section, selection))
    .join("");
}

function renderSection(section, selection) {
  const selectedCount =
    section.type === "multi" ? selectedQuantityTotal(selection, section.id) : selection[section.id] ? 1 : 0;
  const limits = getSectionLimits(section, selection);
  const rule = sectionRule(section, selectedCount, limits);

  return `
    <fieldset class="menu-section">
      <legend class="section-title-row">
        <h3>${section.title}</h3>
        <span class="section-rule">${rule}</span>
      </legend>
      <div class="option-grid">
        ${section.options.map((option) => renderOption(section, option, selection, limits)).join("")}
      </div>
    </fieldset>
  `;
}

function renderOption(section, option, selection, limits) {
  const selectedValues = selection[section.id];
  const quantity =
    section.type === "multi" ? selectedQuantity(selection, section.id, option.name) : 0;
  const selectedCount =
    section.type === "multi" ? selectedQuantityTotal(selection, section.id) : 0;
  const isAtMax = section.type === "multi" && limits.max && selectedCount >= limits.max;
  const isChecked = section.type === "multi" ? quantity > 0 : selectedValues === option.name;
  const isDisabled =
    option.soldOut ||
    (section.type === "multi" &&
      isAtMax &&
      quantity === 0);
  const inputType = section.type === "multi" ? "checkbox" : "radio";
  const optionId = `${section.id}-${slug(option.name)}`;
  const commonInput = `
    <input
      id="${optionId}"
      type="${inputType}"
      name="${section.id}"
      value="${option.name}"
      data-section-id="${section.id}"
      ${isChecked ? "checked" : ""}
      ${isDisabled ? "disabled" : ""}
    />
  `;

  if (section.type === "multi" && !allowsQuantity(section)) {
    return `
      <label class="option-card" for="${optionId}">
        ${commonInput}
        <span class="option-name">${option.name}</span>
        <span class="option-detail">${optionMeta(option, section)}</span>
      </label>
    `;
  }

  if (section.type === "multi") {
    return `
      <div class="option-card option-card-with-stepper">
        <label class="option-main" for="${optionId}">
          ${commonInput}
          <span class="option-name">${option.name}</span>
          <span class="option-detail">${optionMeta(option, section)}</span>
        </label>
        <div class="quantity-stepper" aria-label="${option.name}數量">
          <button
            class="quantity-button"
            type="button"
            data-quantity-action="decrease"
            data-section-id="${section.id}"
            data-option-name="${option.name}"
            ${quantity === 0 || option.soldOut ? "disabled" : ""}
            aria-label="減少${option.name}數量"
          >-</button>
          <span class="quantity-value">${quantity}</span>
          <button
            class="quantity-button"
            type="button"
            data-quantity-action="increase"
            data-section-id="${section.id}"
            data-option-name="${option.name}"
            ${isAtMax || option.soldOut ? "disabled" : ""}
            aria-label="增加${option.name}數量"
          >+</button>
        </div>
      </div>
    `;
  }

  return `
    <label class="option-card" for="${optionId}">
      ${commonInput}
      <span class="option-name">${option.name}</span>
      <span class="option-detail">${optionMeta(option, section)}</span>
    </label>
  `;
}

function visibleSections(restaurant, selection) {
  return restaurant.sections.filter((section) => isSectionVisible(section, selection));
}

function isSectionVisible(section, selection) {
  if (!section.appliesTo) return true;

  const selected = selection[section.appliesTo.sectionId];
  const selectedValues = selectedNames(selected);
  return selectedValues.some((value) => section.appliesTo.optionNames.includes(value));
}

function allowsQuantity(section) {
  return section.type === "multi" && section.quantity !== false;
}

function selectedNames(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([name]) => name);
  }
  return value ? [value] : [];
}

function selectedQuantity(selection, sectionId, optionName) {
  const selected = selection[sectionId];
  if (Array.isArray(selected)) return selected.includes(optionName) ? 1 : 0;
  if (selected && typeof selected === "object") return Number(selected[optionName]) || 0;
  return 0;
}

function selectedQuantityTotal(selection, sectionId) {
  const selected = selection[sectionId];
  if (Array.isArray(selected)) return selected.length;
  if (selected && typeof selected === "object") {
    return Object.values(selected).reduce((sum, quantity) => sum + Math.max(0, Number(quantity) || 0), 0);
  }
  return 0;
}

function setSelectedQuantity(selection, sectionId, optionName, quantity) {
  const current = Array.isArray(selection[sectionId])
    ? Object.fromEntries(selection[sectionId].map((name) => [name, 1]))
    : { ...(selection[sectionId] || {}) };

  if (quantity > 0) {
    current[optionName] = quantity;
  } else {
    delete current[optionName];
  }

  selection[sectionId] = current;
}

function getSectionLimits(section, selection) {
  let min = section.min ?? (section.required ? 1 : 0);
  let max = section.max ?? null;

  if (section.dynamicCount) {
    const selected = selection[section.dynamicCount.sectionId];
    const count = section.dynamicCount.countsByOption[selected];
    if (typeof count === "number") {
      min = count;
      max = count;
    }
  }

  return { min, max };
}

function sectionRule(section, selectedCount, limits) {
  if (section.type !== "multi") return section.required ? "必選" : "選填";
  if (limits.max && limits.min === limits.max) return `${selectedCount}/${limits.max}`;
  if (limits.max) return `${selectedCount}/${limits.max}`;
  if (limits.min) return `${selectedCount}/${limits.min}`;
  return "選填";
}

function normalizeSelection(restaurant, selection) {
  visibleSections(restaurant, selection).forEach((section) => {
    const optionsByName = new Map(section.options.map((option) => [option.name, option]));

    if (section.type === "multi") {
      const limits = getSectionLimits(section, selection);
      const selected = selection[section.id];
      const quantities = Array.isArray(selected)
        ? Object.fromEntries(selected.map((name) => [name, 1]))
        : { ...(selected || {}) };
      const normalized = {};
      let total = 0;

      section.options.forEach((option) => {
        if (!optionsByName.has(option.name) || option.soldOut) return;
        const quantity = Math.max(0, Math.floor(Number(quantities[option.name]) || 0));
        if (!quantity) return;

        const available = limits.max ? Math.max(0, limits.max - total) : quantity;
        const allowedQuantity = allowsQuantity(section) ? quantity : 1;
        const nextQuantity = limits.max ? Math.min(allowedQuantity, available) : allowedQuantity;
        if (!nextQuantity) return;

        normalized[option.name] = nextQuantity;
        total += nextQuantity;
      });

      selection[section.id] = normalized;
      return;
    }

    const selected = optionsByName.get(selection[section.id]);
    if (selected?.soldOut || !selected) {
      selection[section.id] = "";
    }
  });
}

function slug(value) {
  return encodeURIComponent(value).replaceAll("%", "");
}

function softColor(hex) {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{1,2}/g)
    .map((part) => parseInt(part, 16));
  return `rgba(${r}, ${g}, ${b}, 0.12)`;
}

function updateSelection(input) {
  const restaurant = getRestaurant();
  const section = restaurant.sections.find((item) => item.id === input.dataset.sectionId);
  const selection = getSelection(restaurant);
  const option = section.options.find((item) => item.name === input.value);
  const limits = getSectionLimits(section, selection);

  if (option?.soldOut) {
    input.checked = false;
    showToast(`${option.name}目前售完`);
    return;
  }

  if (section.type === "multi") {
    const currentQuantity = selectedQuantity(selection, section.id, input.value);
    const selectedCount = selectedQuantityTotal(selection, section.id);
    if (input.checked) {
      if (currentQuantity === 0 && limits.max && selectedCount >= limits.max) {
        input.checked = false;
        showToast(`${section.title}最多 ${limits.max} 項`);
        return;
      }
      setSelectedQuantity(selection, section.id, input.value, Math.max(currentQuantity, 1));
    } else {
      setSelectedQuantity(selection, section.id, input.value, 0);
    }
  } else {
    selection[section.id] = input.value;
  }

  normalizeSelection(restaurant, selection);
  renderMenu();
  syncSummary();
}

function updateQuantity(button) {
  const restaurant = getRestaurant();
  const section = restaurant.sections.find((item) => item.id === button.dataset.sectionId);
  if (!section || section.type !== "multi") return;

  const selection = getSelection(restaurant);
  const option = section.options.find((item) => item.name === button.dataset.optionName);
  const limits = getSectionLimits(section, selection);

  if (!option) return;

  if (option?.soldOut) {
    showToast(`${option.name}目前售完`);
    return;
  }

  const currentQuantity = selectedQuantity(selection, section.id, option.name);
  const selectedCount = selectedQuantityTotal(selection, section.id);
  const nextQuantity =
    button.dataset.quantityAction === "increase"
      ? currentQuantity + 1
      : Math.max(0, currentQuantity - 1);

  if (
    button.dataset.quantityAction === "increase" &&
    limits.max &&
    selectedCount >= limits.max
  ) {
    showToast(`${section.title}最多 ${limits.max} 份`);
    return;
  }

  setSelectedQuantity(selection, section.id, option.name, nextQuantity);
  normalizeSelection(restaurant, selection);
  renderMenu();
  syncSummary();
}

function selectedOptions(section, selection) {
  const selected = selection[section.id];
  const values = selectedNames(selected);
  return section.options.filter((option) => values.includes(option.name) && !option.soldOut);
}

function buildOrder() {
  const restaurant = getRestaurant();
  const selection = getSelection(restaurant);
  normalizeSelection(restaurant, selection);
  const lines = [`【${restaurant.name}】`];
  let total = 0;
  let ready = true;

  lines.push(`訂餐人：${state.customerName.trim() || "未填"}`);

  visibleSections(restaurant, selection).forEach((section) => {
    const options = selectedOptions(section, selection);
    const selectedCount =
      section.type === "multi" ? selectedQuantityTotal(selection, section.id) : options.length;
    const limits = getSectionLimits(section, selection);
    const isMissing =
      section.type === "multi"
        ? selectedCount < limits.min
        : section.required && options.length === 0;
    if (isMissing) ready = false;

    if (!options.length && !isMissing) return;

    let value = "無";
    if (options.length) {
      value = options
        .map((option) => {
          const quantity = section.type === "multi" ? selectedQuantity(selection, section.id, option.name) : 1;
          return priceLabel(option, section, quantity);
        })
        .join("、");
      if (isMissing && section.type === "multi") {
        value = `${value}（需選 ${limits.min} 份）`;
      }
    } else if (isMissing) {
      value = "未選";
    }

    total += options.reduce((sum, option) => {
      const quantity = section.type === "multi" ? selectedQuantity(selection, section.id, option.name) : 1;
      return sum + option.price * quantity;
    }, 0);
    lines.push(`${section.title}：${value}`);
  });

  if (state.note.trim()) {
    lines.push(`備註：${state.note.trim()}`);
  }

  lines.push(`估計金額：${formatPrice(total)}`);

  return {
    restaurant,
    lines,
    ready,
    selection,
    text: lines.join("\n"),
    total,
  };
}

function priceLabel(option, section, quantity = 1) {
  const quantityLabel = section.type === "multi" && quantity > 1 ? ` x${quantity}` : "";
  if (!option.price) return `${option.name}${quantityLabel}`;
  const price = option.price * quantity;
  return section.type === "single"
    ? `${option.name} ${formatPrice(price)}`
    : `${option.name}${quantityLabel} +${formatPrice(price)}`;
}

function syncSummary() {
  const order = buildOrder();
  elements.summaryText.textContent = order.text;
  elements.orderTotal.textContent = formatPrice(order.total);
  elements.summaryStatus.textContent = order.ready ? "可複製或下載" : "尚有必選項目";
  elements.copyButton.disabled = !order.ready;
  elements.jpgButton.disabled = !order.ready;
}

async function copySummary() {
  const order = buildOrder();
  if (!order.ready) {
    showToast("請先完成必選項目");
    return;
  }

  try {
    await navigator.clipboard.writeText(order.text);
    showToast("已複製點餐內容");
  } catch {
    fallbackCopy(order.text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showToast("已複製點餐內容");
}

function downloadJpg() {
  const order = buildOrder();
  if (!order.ready) {
    showToast("請先完成必選項目");
    return;
  }

  const canvas = drawOrderCanvas(order);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  link.href = dataUrl;
  link.download = `order-${order.restaurant.id}-${stamp}.jpg`;
  link.click();

  elements.jpgPreview.src = dataUrl;
  elements.previewPanel.hidden = false;
  showToast("已產生 JPG");
}

function drawOrderCanvas(order) {
  const width = 1200;
  const padding = 72;
  const contentWidth = width - padding * 2;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.font = font("700", 36);
  const wrappedLines = order.lines.flatMap((line) => wrapText(ctx, line, contentWidth));
  const height = 260 + wrappedLines.length * 52 + 96;
  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#f4f6f4";
  ctx.fillRect(0, 0, width, height);

  roundRect(ctx, 38, 38, width - 76, height - 76, 28);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.fillStyle = order.restaurant.color;
  roundRect(ctx, 72, 72, width - 144, 128, 22);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = font("800", 52);
  ctx.fillText(order.restaurant.name, padding + 26, 132);
  ctx.font = font("700", 24);
  ctx.fillText(formatDateTime(new Date()), padding + 28, 170);

  ctx.fillStyle = "#16221f";
  ctx.font = font("700", 36);
  let y = 264;
  wrappedLines.forEach((line, index) => {
    if (index === wrappedLines.length - 1) {
      ctx.fillStyle = order.restaurant.color;
      ctx.font = font("800", 40);
      y += 14;
    }
    ctx.fillText(line, padding, y);
    y += index === wrappedLines.length - 1 ? 58 : 52;
  });

  ctx.strokeStyle = "#d9dfda";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(padding, height - 112);
  ctx.lineTo(width - padding, height - 112);
  ctx.stroke();

  ctx.fillStyle = "#65706c";
  ctx.font = font("700", 24);
  ctx.fillText("自助點餐機", padding, height - 62);

  return canvas;
}

function font(weight, size) {
  return `${weight} ${size}px PingFang TC, Noto Sans TC, Microsoft JhengHei, sans-serif`;
}

function wrapText(ctx, text, maxWidth) {
  const lines = [];
  let current = "";

  Array.from(text).forEach((char) => {
    const test = current + char;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = char;
    } else {
      current = test;
    }
  });

  if (current) lines.push(current);
  return lines;
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 1800);
}

function clearCurrentOrder() {
  const restaurant = getRestaurant();
  state.selectionsByRestaurant[restaurant.id] = createEmptySelection(restaurant);
  state.note = "";
  elements.orderNote.value = "";
  renderMenu();
  syncSummary();
  showToast("已清除本次選擇");
}

function scrollToPageTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToPageBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

elements.restaurantList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-restaurant-id]");
  if (!button) return;
  state.restaurantId = button.dataset.restaurantId;
  renderRestaurants();
  renderMenu();
  syncSummary();
});

elements.menuForm.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity-action]");
  if (!button) return;
  updateQuantity(button);
});

elements.menuForm.addEventListener("change", (event) => {
  if (!event.target.matches("input[data-section-id]")) return;
  updateSelection(event.target);
});

elements.customerName.addEventListener("input", (event) => {
  state.customerName = event.target.value;
  syncSummary();
});

elements.orderNote.addEventListener("input", (event) => {
  state.note = event.target.value;
  syncSummary();
});

elements.clearButton.addEventListener("click", clearCurrentOrder);
elements.copyButton.addEventListener("click", copySummary);
elements.jpgButton.addEventListener("click", downloadJpg);
elements.scrollTopButton.addEventListener("click", scrollToPageTop);
elements.scrollBottomButton.addEventListener("click", scrollToPageBottom);

elements.appVersionLabel.textContent = APP_VERSION;

renderRestaurants();
renderMenu();
syncSummary();
loadQuickClickStatus({ silent: true });
setInterval(() => {
  loadQuickClickStatus({ silent: true });
}, QUICKCLICK_SYNC_INTERVAL_MS);
