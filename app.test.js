const assert = require("node:assert/strict");
const test = require("node:test");

const {
  applyMenuStatus,
  buildOrder,
  findImenuSource,
  getSelection,
  restaurants,
  state,
  syncableOptions,
} = require("./app");
const { isSoldOut, resolveRequestPath } = require("./server");
const menuStatus = require("./imenu-status.json");

function resetOrder(restaurantId) {
  state.restaurantId = restaurantId;
  state.customerName = "";
  state.note = "";
  state.selectionsByRestaurant = {};
  return getSelection();
}

test("iMenu 選項都有同步來源", () => {
  const missing = syncableOptions().filter(({ option }) => !findImenuSource(menuStatus, option.imenu));
  assert.deepEqual(missing, []);
});

test("自由組合會檢查必選份數並正確計價", () => {
  const selection = resetOrder("pokehouse-sansia");
  selection.main = "小波奇";
  selection.base = "胚芽紫米";
  selection.sides = Object.fromEntries(
    ["紫洋蔥", "海藻沙拉", "海帶芽", "毛豆", "番茄"].map((name) => [name, 1])
  );
  selection.protein = { 牛肉: 1 };
  selection.sauce = "主廚經典醬";
  selection.toppings = { 香菜: 1, 青蔥: 1 };

  assert.equal(buildOrder().ready, false);
  selection.sides["鳳梨"] = 1;

  const order = buildOrder();
  assert.equal(order.ready, true);
  assert.equal(order.total, 170);
  assert.match(order.text, /蛋白質：牛肉 \+\$5/);
});

test("未選的選填區段不會出現在摘要", () => {
  const selection = resetOrder("traditional-tofu-pudding");
  selection.main = "冰";

  const order = buildOrder();
  assert.equal(order.ready, true);
  assert.equal(order.total, 40);
  assert.doesNotMatch(order.text, /配料：/);
  assert.doesNotMatch(order.text, /冰量：/);
});

test("同步來源缺漏時品項會停用，恢復後可再次使用", () => {
  const option = restaurants[0].sections[0].options[0];
  applyMenuStatus({ sets: {}, items: {}, details: {}, updatedAt: new Date().toISOString() });
  assert.equal(option.soldOut, true);
  assert.equal(option.syncMissing, true);

  applyMenuStatus(menuStatus);
  assert.equal(option.soldOut, false);
  assert.equal(option.syncMissing, false);
});

test("伺服器會拒絕路徑穿越並辨識售完庫存", () => {
  assert.equal(resolveRequestPath("/%2e%2e%2fserver.js"), null);
  assert.equal(isSoldOut({ sold_status: 1, stock: 0 }), true);
  assert.equal(isSoldOut({ sold_status: 1, stock: 3 }), false);
});
