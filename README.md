# 自助點餐機維護筆記

這個專案是給家人或朋友快速勾選餐點用的網頁。主要菜單資料在 `app.js` 的 `restaurants` 陣列；版本號在 `APP_VERSION`；iMenu 售完狀態由 `server.js` 每 1 小時同步一次到 `imenu-status.json`。公開網頁由 GitHub Actions 每小時更新同步檔。

## 固定維護規則

使用者之後可能會定期提供餐廳點餐連結，要求同步最新菜單。收到連結時請：

1. 優先找點餐網站的公開 JSON/API，不使用 AI 判讀圖片或文字。
2. 對照目前 `app.js` 裡的 `restaurants` 資料。
3. 更新對應餐廳的選項與價格，保留既有 UI 互動邏輯。
4. 如果是可複選且原點餐網站支援同品項加份數，就保留或啟用數量控制。
5. 如果使用者明確說某餐廳不需要加份數，該區塊使用 `quantity: false`。
6. 未選的選填或加點項目不要出現在複製摘要裡。
7. 更新後至少執行 `node --check app.js`、`node --check server.js`，並用本機頁面快速驗證摘要與總價。

## 目前餐廳

- `PokéHouse 波奇好食`
  - 來源連結：https://imenu.com.tw/PokeHouse/PH_SanSia/menu
  - 同步 API：`https://api.idelivery.com.tw/store/10692/menu`
  - 售完判斷：iMenu `sold_status` 不是 `1`，或庫存欄位歸零。

- `山泉水豆花`
  - 手動菜單，沒有點餐網站。
  - 餐點：`豆花 $40`、`冰 $40`
  - `冰` 備註：無豆花。
  - 配料：粉圓、綠豆、大紅豆、小紅豆、花生、薏仁、雪蓮子。
  - 配料最多選 2 種，不必選，不需要加份數控制。
  - 選 `豆花` 時要顯示且必選冰量：去冰、少冰、正常冰、多冰。
  - 選 `冰` 時不要顯示冰量。

## 本機預覽

可在專案資料夾啟動本機伺服器，會自動同步 iMenu 狀態：

```bash
node server.js
```

然後打開：

```text
http://localhost:4173/
```

## 公開網址

目前已部署到 GitHub Pages：

```text
https://toto-168.github.io/self-order-menu/
```

GitHub repo：

```text
https://github.com/TOTO-168/self-order-menu
```
