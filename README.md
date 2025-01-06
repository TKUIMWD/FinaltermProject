# FinaltermProject

## 安裝與執行指引
clone 專案 或 下載專案 .zip
```
https://github.com/TKUIMWD/FinaltermProject.git
```
zip下載

```
點選本網頁右上綠色<>code按鈕 選擇downloadZIP
```
切換到專案目錄
```
cd your_path_to_FinaltermProject
```

### 前端

`Frontend` 目錄下 
複製 `.env.example` 到 `.env` 
修改變數配置
本地運行: 
```
cd Frontend
npm install
npm run dev
```

### 後端

`Backend` 目錄下 
複製 `.env.example` 到 `.env` 
修改變數配置 
運行 
```
npm run dev
```
## 主題

### DWRP - Dish Washer Reserve Platform 預約刷碗工到府刷碗平台

## 目標
TKUIMWD 團隊網站的設計風格靈感源於實際需求，整體網站以刷碗工預約平台為主題，有著便捷的預約體驗和清晰的功能展示，網站內容包括登入/註冊、刷碗工資訊、預約刷碗工、客戶服務，讓用戶可以輕鬆預約洗碗工服務，點擊左上角的Logo也有關於平台的資訊。

## 設計概念、風格介紹
團隊設計了一個刷碗工預約平台，網站設計強調簡約和直觀的介面，讓用戶能夠輕鬆地完成預約流程。網站整體色彩搭配也以簡約和舒適的色調為主，細節之處融入微小的動畫效果和視覺裝飾，以增強網站的使用體驗。


## 設計原則
- ### 現代簡約設計
    以注重簡潔和功能性的風格進行網站設計，採用樸素的風格來讓功能容易被察覺，背景主要使用白色，導覽列則是採用深藍色，並搭配白色字體和亮色陰影形成對比效果，讓我們的網站功能更突出。
    
- ### 視覺設計規範化
    刷碗工的資訊採用相同元素進行設計，card中的字體大小、照片、區塊陰影等風格都保持一致，讓使用者可以更好的觀看與使用。

- ### 網站互動設計說明 
    點擊首頁的Icon，可查看平台簡介;頁面底部Footer能跳轉到團隊的 GitHub page，讓用戶知道更多團隊相關資訊。


## 技術選用與原因
- ### Vite

    - 採用現代化的 ES 模組加載方式，提供快速的熱重載和高效的打包速度。
    - 大幅縮短開發過程中的等待時間，提升整體開發效率。
    - 適合大型應用的增量開發需求，特別在頻繁變更的專案場景中表現優異。

- ### React

    - 元件化架構支持代碼模組化與重用，降低開發與維護成本。
    - 虛擬 DOM 技術減少實際 DOM 操作，提升渲染性能，確保流暢的用戶體驗。
    - 生態系統豐富，擁有大量第三方庫與工具支持，提高開發靈活性。

- ### TypeScript

    - 靜態強型別系統能在編譯期間捕捉潛在錯誤，增強代碼穩定性。
    - 類型推斷與代碼補全功能提升協作效率，縮短開發時間。
    - 精確的類型定義降低代碼修改風險，適合長期運行與多階段迭代的專案。
    
- ### MongoDB

    - 支持 JSON 格式數據，靈活處理非結構化與半結構化數據需求。
    - 與 React 技術棧無縫整合，簡化數據處理流程，提升開發效率。
    - 提供靈活的索引機制與聚合框架，高效處理複雜查詢和實時數據需求。

- ### Figma設計稿
    https://www.figma.com/design/V7Mk5MvzqjmhrZYJ1hd48c/%E6%9C%9F%E6%9C%AB%E5%B0%88%E6%A1%88?node-id=109-347&t=rTCbDHushilFIjIS-0

## 規劃

- ### 組件拆分
    利用組件拆分使各主要元素獨立，這樣可以有利於提高可維護性與擴展性。使用組件拆分，將介紹分爲資料與組件兩個部分，此時只要帶入不同的資料即可生成多種組件，以提高可重用性。同時可以讓各部件開發不受到對方影響，進而提升專案開發的效率。
    
- ### TS interface
    - 類型檢查能夠在編譯時檢查物件的結構，使團隊可以提早發現錯誤，避免在運行時發生類型不匹配的錯誤。
    
    - 提供了明確的物件結構定義，讓開發者可以輕鬆理解物件的屬性和方法，從而提高代碼的可讀性和可維護性。

    - 能讓多個不同的物件使用相同的結構，進而提高代碼重用性。


## API Doc

[API.md](./API.md)

## 架構圖與流程圖


## 分工表

- ### HPW
    - 專案討論與製作，文檔討論
- ### ZZY
    - Figma設計與製作，文檔製作
- ### LCH
    - Figma製作，錄製操作影片
- ### LTA
    - 測試網站功能、API文檔製作
