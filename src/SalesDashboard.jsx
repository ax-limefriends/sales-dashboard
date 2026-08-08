import React from 'react';
import { Bar, Line, ComposedChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

/* ============ 1. 데이터 (실제 값으로 교체하는 부분) ============ */

const kpiData = [
  { label: '이번 달 매출 (MTD)', value: '8,470만원', delta: '목표 대비 92.1% · 730만원 남음', up: true },
  { label: '목표 달성 전망', value: '9,050만원', delta: '▲ 98.4% 달성 예상', up: true },
  { label: '평균 계약 단가 (AOV)', value: '236만원', delta: '▲ 12.4% 전월 대비', up: true },
  { label: '계약 건수', value: '359건', delta: '▲ 8.7% 전월 대비', up: true },
];

const monthlyData = [
  { month: '2월', revenue: 6200, target: 9200 },
  { month: '3월', revenue: 6900, target: 9200 },
  { month: '4월', revenue: 7100, target: 9200 },
  { month: '5월', revenue: 7310, target: 9200 },
  { month: '6월', revenue: 8050, target: 9200 },
  { month: '7월', revenue: 8470, target: 9200 },
];

const funnelStages = [
  { name: '접촉', value: 1762, pct: 100 },
  { name: '견적', value: 1140, pct: 64.7 },
  { name: '협상', value: 612, pct: 34.7 },
  { name: '계약', value: 359, pct: 20.4 },
];

const repData = [
  { name: '김도현', amount: 1820, rate: '112%', up: true },
  { name: '이수진', amount: 1460, rate: '104%', up: true },
  { name: '박현진', amount: 1280, rate: '101%', up: true },
  { name: '전하늘', amount: 970, rate: '86%', up: false },
  { name: '최윤서', amount: 760, rate: '78%', up: false },
];

const productData = [
  { name: '기업용 솔루션', amount: 3120, rate: '+18%', up: true },
  { name: '프리미엄 컨설팅', amount: 2340, rate: '+0%', up: true },
  { name: '고급형 플랜', amount: 1480, rate: '-4%', up: false },
  { name: '관리형 자원', amount: 930, rate: '-6%', up: false },
  { name: '사내 교육', amount: 800, rate: '-11%', up: false },
];

/* ============ 2. 재사용 컴포넌트 ============ */

function LiveBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 12, fontWeight: 600, color: '#16A34A',
      background: '#F0FDF4', border: '1px solid #BBF7D0',
      padding: '4px 10px', borderRadius: 999,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: '#22C55E',
        animation: 'pulse 1.6s infinite',
      }} />
      LIVE
    </span>
  );
}

function KPICard({ label, value, delta, up }) {
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12,
      padding: '16px 18px',
    }}>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 12, color: up ? '#16A34A' : '#DC2626' }}>{delta}</div>
    </div>
  );
}

function KPIRow({ items }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16,
    }}>
      {items.map((item) => <KPICard key={item.label} {...item} />)}
    </div>
  );
}

function Panel({ title, tag, children }) {
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12,
      padding: '16px 18px',
    }}>
      <div style={{
        fontSize: 13, fontWeight: 600, marginBottom: 12,
        display: 'flex', justifyContent: 'space-between',
      }}>
        <span>{title}</span>
        {tag && <span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400 }}>{tag}</span>}
      </div>
      {children}
    </div>
  );
}

function RevenueChart({ data }) {
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid vertical={false} stroke="#F1F1EF" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
          <Bar dataKey="revenue" radius={[4, 4, 0, 0]} barSize={28}>
            {data.map((entry, i) => (
              <Cell key={entry.month} fill={i === data.length - 1 ? '#0D9488' : '#99D8CE'} />
            ))}
          </Bar>
          <Line dataKey="target" stroke="#D1D5DB" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

function FunnelPanel({ stages }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
      {stages.map((stage) => (
        <div key={stage.name}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 12, color: '#6B7280', marginBottom: 4,
          }}>
            <span>{stage.name}</span>
            <span>{stage.value.toLocaleString()}건 · {stage.pct}%</span>
          </div>
          <div style={{ height: 20, background: '#F1F5F4', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${stage.pct}%`, background: '#0D9488' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function RankTable({ rows }) {
  const maxAmount = Math.max(...rows.map((r) => r.amount));
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          <th style={thStyle}>순위</th>
          <th style={thStyle}>이름</th>
          <th style={thStyle}>매출</th>
          <th style={thStyle}>달성률</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.name}>
            <td style={tdStyle}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: '#CCFBF1', color: '#0D9488',
                fontSize: 11, fontWeight: 700,
              }}>{i + 1}</span>
            </td>
            <td style={tdStyle}>{row.name}</td>
            <td style={tdStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ minWidth: 70 }}>{row.amount.toLocaleString()}만원</span>
                <div style={{ flex: 1, height: 6, background: '#F1F5F4', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${Math.round((row.amount / maxAmount) * 100)}%`,
                    background: '#0D9488', borderRadius: 3,
                  }} />
                </div>
              </div>
            </td>
            <td style={{ ...tdStyle, color: row.up ? '#16A34A' : '#DC2626' }}>{row.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = {
  textAlign: 'left', padding: '7px 4px', color: '#9CA3AF',
  fontWeight: 500, fontSize: 12, borderBottom: '1px solid #E5E7EB',
};
const tdStyle = { textAlign: 'left', padding: '7px 4px', borderBottom: '1px solid #E5E7EB' };

/* ============ 3. 메인 대시보드 ============ */

export default function SalesDashboard() {
  return (
    <div style={{
      background: '#F4F5F7', fontFamily: '-apple-system, "Segoe UI", "Malgun Gothic", sans-serif',
      color: '#111827', padding: 24,
    }}>
      <style>{`@keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
        70% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
      }`}</style>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>영업 대시보드</h1>
          <div style={{ fontSize: 13, color: '#6B7280' }}>2026년 7월 · 실시간 집계</div>
        </div>
        <LiveBadge />
      </div>

      <KPIRow items={kpiData} />

      <div style={{
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12, marginBottom: 12,
      }}>
        <Panel title="월별 매출 vs 목표" tag="단위: 만원">
          <RevenueChart data={monthlyData} />
        </Panel>
        <Panel title="영업 파이프라인" tag="전체 1,762건">
          <FunnelPanel stages={funnelStages} />
        </Panel>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
      }}>
        <Panel title="담당자별 매출" tag="TOP 5">
          <RankTable rows={repData} />
        </Panel>
        <Panel title="상품별 매출" tag="TOP 5">
          <RankTable rows={productData} />
        </Panel>
      </div>
    </div>
  );
}
