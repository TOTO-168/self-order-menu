const customPokeNames = ["素食波奇", "小波奇", "大波奇", "豪華波奇"];
const proteinPokeNames = ["小波奇", "大波奇", "豪華波奇"];
const freeBaseOptions = [
  "胚芽紫米",
  "生菜",
  "筆尖麵",
  "胚芽紫米+生菜",
  "胚芽紫米+筆尖麵",
  "生菜+筆尖麵",
].map((name) => ({ name, price: 0 }));
const freeSideNames = [
  "紫洋蔥",
  "海藻沙拉",
  "海帶芽",
  "毛豆",
  "番茄",
  "鳳梨",
  "小黃瓜",
  "苜蓿芽",
  "綠花椰",
  "紅蘿蔔",
  "玉米",
  "豆腐",
  "牛蒡絲",
  "馬鈴薯",
  "黃金泡菜",
  "雲耳",
  "紅地瓜泥",
];
const freeSideOptions = [
  ...freeSideNames.map((name) => ({ name, price: 0 })),
  { name: "紫地瓜泥", price: 0, soldOut: true },
];
const sauceOptions = [
  "主廚經典醬",
  "美式辣美乃滋",
  "哇沙米 (素)",
  "川味麻辣",
  "和風油醋 (素)",
  "焙煎胡麻",
  "蜂蜜芥末",
  "百香優格",
  "不加醬",
].map((name) => ({ name, price: 0 }));
const toppingOptions = [
  "香菜",
  "青蔥",
  "玉米脆片",
  "香鬆",
  "堅果",
  "芝麻",
  "七味粉",
  "起司粉",
  "海苔",
  "麵包丁",
].map((name) => ({ name, price: 0 }));
const addOnBaseOptions = freeBaseOptions.map((option) => ({ ...option, price: 20 }));
const addOnSideOptions = [
  ...freeSideNames.map((name) => ({ name, price: 12 })),
  { name: "紫地瓜泥", price: 12, soldOut: true },
];
const addOnProteinOptions = [
  { name: "舒肥雞胸", price: 40 },
  { name: "豬肉", price: 40 },
  { name: "起司乳酪", price: 40 },
  { name: "蝦仁", price: 40 },
  { name: "珍珠魚卵", price: 40 },
  { name: "水煮蛋", price: 20 },
  { name: "魷魚圈", price: 40 },
  { name: "牛肉", price: 45 },
  { name: "挪威生鮭魚", price: 60 },
];
const addOnSauceOptions = sauceOptions
  .filter((option) => option.name !== "不加醬")
  .map((option) => ({ ...option, price: 15 }));
const addOnToppingOptions = toppingOptions.map((option) => ({ ...option, price: 5 }));

const restaurants = [
  {
    id: "pokehouse-sansia",
    name: "PokéHouse 波奇好食",
    tag: "波奇碗 / 健康餐",
    meta: "新北市三峽區國慶路102號",
    color: "#0f7d68",
    sections: [
      {
        id: "main",
        title: "餐點",
        type: "single",
        required: true,
        options: [
          { name: "素食波奇", price: 135, detail: "自由組合｜無蛋白質" },
          { name: "小波奇", price: 165, detail: "自由組合｜一種蛋白質" },
          { name: "大波奇", price: 195, detail: "自由組合｜二種蛋白質" },
          { name: "豪華波奇", price: 225, detail: "自由組合｜三種蛋白質" },
          {
            name: "舒肥雞胸",
            price: 195,
            detail: "組合波奇｜胚芽紫米｜舒肥雞胸(2份)｜毛豆｜馬鈴薯｜紅蘿蔔｜玉米｜海帶芽｜花椰菜｜和風油醋｜青蔥",
          },
          {
            name: "黃金泡菜豬",
            price: 195,
            detail: "組合波奇｜胚芽紫米｜豬肉(2份)｜毛豆｜泡菜｜紅蘿蔔｜豆腐｜鳳梨｜海帶芽｜主廚經典醬｜海苔｜堅果",
          },
          {
            name: "豪華海陸",
            price: 215,
            detail: "組合波奇｜胚芽紫米｜蛋｜蝦仁｜豬肉｜番茄｜馬鈴薯｜花椰菜｜玉米｜紫洋蔥｜小黃瓜｜毛豆｜主廚經典醬｜芝麻｜米香",
          },
          {
            name: "夏威夷鮭魚",
            price: 185,
            detail: "組合波奇｜胚芽紫米｜挪威生鮭魚｜海帶芽｜玉米｜馬鈴薯｜紫洋蔥｜小黃瓜｜苜蓿芽｜哇沙米｜芝麻｜海苔",
          },
          {
            name: "辣海鮮波奇",
            price: 195,
            detail: "組合波奇｜胚芽紫米｜蝦仁｜珍珠魚卵｜苜蓿芽｜紅地瓜｜番茄｜毛豆｜海藻沙拉｜小黃瓜｜美式辣美乃滋｜芝麻｜七味粉",
          },
          {
            name: "川味麻辣牛",
            price: 205,
            detail: "組合波奇｜胚芽紫米｜牛肉(2份)｜毛豆｜馬鈴薯｜苜蓿芽｜玉米｜豆腐｜海帶芽｜川味麻辣｜芝麻｜堅果",
          },
        ],
      },
      {
        id: "base",
        title: "基底",
        type: "single",
        required: true,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: freeBaseOptions,
      },
      {
        id: "sides",
        title: "配菜",
        type: "multi",
        min: 6,
        max: 6,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: freeSideOptions,
      },
      {
        id: "protein",
        title: "蛋白質",
        type: "multi",
        appliesTo: { sectionId: "main", optionNames: proteinPokeNames },
        dynamicCount: {
          sectionId: "main",
          countsByOption: {
            小波奇: 1,
            大波奇: 2,
            豪華波奇: 3,
          },
        },
        options: [
          { name: "舒肥雞胸", price: 0 },
          { name: "豬肉", price: 0 },
          { name: "起司乳酪", price: 0 },
          { name: "蝦仁", price: 0 },
          { name: "珍珠魚卵", price: 0 },
          { name: "水煮蛋", price: 0 },
          { name: "魷魚圈", price: 0 },
          { name: "牛肉", price: 5 },
          { name: "挪威生鮭魚", price: 20 },
        ],
      },
      {
        id: "sauce",
        title: "醬料",
        type: "single",
        required: true,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: sauceOptions,
      },
      {
        id: "toppings",
        title: "點綴",
        type: "multi",
        min: 2,
        max: 2,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: toppingOptions,
      },
      {
        id: "extra-base",
        title: "加點基底",
        type: "multi",
        max: 3,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: addOnBaseOptions,
      },
      {
        id: "extra-sides",
        title: "加點配菜",
        type: "multi",
        max: 6,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: addOnSideOptions,
      },
      {
        id: "extra-protein",
        title: "加點蛋白質",
        type: "multi",
        max: 3,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: addOnProteinOptions,
      },
      {
        id: "extra-sauce",
        title: "加點醬料",
        type: "multi",
        max: 3,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: addOnSauceOptions,
      },
      {
        id: "extra-toppings",
        title: "加點點綴",
        type: "multi",
        max: 6,
        appliesTo: { sectionId: "main", optionNames: customPokeNames },
        options: addOnToppingOptions,
      },
      {
        id: "soup-drinks",
        title: "湯品 / 飲品",
        type: "multi",
        max: 6,
        options: [
          { name: "日式海帶芽味噌湯", price: 40, detail: "湯品" },
          { name: "南瓜濃湯", price: 65, detail: "湯品", soldOut: true },
          { name: "桂花金萱茶", price: 40, detail: "無糖" },
          { name: "桂蜜蘋果紅茶", price: 40, detail: "無糖" },
          { name: "白桃烏龍茶", price: 40, detail: "無糖" },
        ],
      },
      {
        id: "side-orders",
        title: "單點配菜",
        type: "multi",
        max: 10,
        options: addOnSideOptions,
      },
      {
        id: "other",
        title: "其他",
        type: "multi",
        max: 2,
        options: [{ name: "購物袋", price: 3 }],
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
};

const elements = {
  restaurantList: document.querySelector("#restaurantList"),
  restaurantCount: document.querySelector("#restaurantCount"),
  selectedRestaurantLabel: document.querySelector("#selectedRestaurantLabel"),
  restaurantMeta: document.querySelector("#restaurantMeta"),
  customerName: document.querySelector("#customerName"),
  orderNote: document.querySelector("#orderNote"),
  menuForm: document.querySelector("#menuForm"),
  clearButton: document.querySelector("#clearButton"),
  summaryText: document.querySelector("#summaryText"),
  summaryStatus: document.querySelector("#summaryStatus"),
  orderTotal: document.querySelector("#orderTotal"),
  copyButton: document.querySelector("#copyButton"),
  jpgButton: document.querySelector("#jpgButton"),
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
  elements.restaurantMeta.textContent = restaurant.meta;

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

renderRestaurants();
renderMenu();
syncSummary();
