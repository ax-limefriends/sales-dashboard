# 영업 대시보드 (React + Recharts)

## Antigravity에서 실행하는 방법

1. 이 폴더(`sales-dashboard`) 전체를 압축 해제한 뒤 Antigravity에서 `Open Folder`로 이 폴더를 엽니다.
2. Antigravity 하단 터미널을 열고 (Ctrl + `) 아래 명령어를 순서대로 실행합니다.

   ```bash
   npm install
   npm run dev
   ```

3. 터미널에 아래와 같은 로그가 뜨면 정상 실행된 것입니다.

   ```
   VITE ready
   ➜  Local:   http://localhost:5173/
   ```

4. `http://localhost:5173`을 브라우저(또는 Antigravity 내장 브라우저 에이전트)로 열면 대시보드가 보입니다.
5. Antigravity 에이전트에게 "이 대시보드 실행해서 확인해줘" 라고 요청하면, 터미널 명령 실행부터 브라우저 확인까지 에이전트가 대신 수행합니다.

## 데이터 교체 위치

`src/SalesDashboard.jsx` 상단의 다음 배열만 실제 값으로 바꾸면 화면 전체가 갱신됩니다.

- `kpiData` — 상단 KPI 카드 4개
- `monthlyData` — 월별 매출 vs 목표 차트
- `funnelStages` — 영업 파이프라인 단계
- `repData`, `productData` — 담당자별/상품별 TOP5 테이블

## 폴더 구조

```
sales-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx           # React 진입점
    └── SalesDashboard.jsx # 대시보드 컴포넌트 (KPICard, RevenueChart, RankTable 등)
```
