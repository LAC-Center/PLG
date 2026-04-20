'use client'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import { MARKET_DATA, CORRIDOR_DATA, computeMarketScore } from '@/lib/data'

const scored = computeMarketScore(MARKET_DATA, CORRIDOR_DATA)

const REGION_COLORS: Record<string, string> = {
  'North Africa': '#4f8ef7',
  'West Africa': '#00e5a0',
  'East Africa': '#ff6b35',
  'Southern Africa': '#a78bfa',
}

function KPI({ label, value, sub, color = 'var(--accent)' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="card-sm" style={{ flex: 1 }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={{
      background: 'var(--surface2)', border: '1px solid var(--border)',
      borderRadius: 8, padding: '12px 16px', fontSize: 12,
    }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{d.country}</div>
      <div style={{ color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>
        <div>Avg Corridor Cost: <span style={{ color: 'var(--accent2)' }}>{d.avgCost?.toFixed(1)}%</span></div>
        <div>Remittance Volume: <span style={{ color: 'var(--accent)' }}>${d.received_bn}B</span></div>
        <div>% of GDP: <span style={{ color: 'var(--accent3)' }}>{d.gdp_pct}%</span></div>
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 6, paddingTop: 6 }}>
          Inefficiency Score: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{d.score}</span>
        </div>
      </div>
    </div>
  )
}

export default function MarketOpportunity() {
  const scatterData = scored.map(d => ({
    ...d,
    x: d.avgCost,
    y: d.received_bn,
    z: d.gdp_pct,
  }))

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Market Opportunity Analysis</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          Identifies African remittance markets with structural pricing inefficiency — where high corridor costs, 
          large volumes, and GDP dependency create maximum entry value for Wise.
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <KPI label="TOTAL AFRICA REMITTANCES" value="$89.7B" sub="2023 received (USD)" />
        <KPI label="HIGHEST CORRIDOR COST" value="23.7%" sub="Tanzania → Uganda" color="var(--accent2)" />
        <KPI label="G20 TARGET (<3%)" value="3.0%" sub="SDG 10.c goal" color="var(--accent3)" />
        <KPI label="WISE CURRENT FEE" value="0.6%" sub="avg. transaction fee" color="var(--accent)" />
        <KPI label="PRICE PREMIUM AVAILABLE" value="22.1pp" sub="cost spread vs. Wise" color="#a78bfa" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Scatter Plot */}
        <div className="card">
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Corridor Cost vs. Remittance Volume</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              High-cost + high-volume quadrant = maximum opportunity for Wise
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="x" name="Corridor Cost (%)"
                label={{ value: 'Avg Corridor Cost (%)', position: 'bottom', fill: 'var(--muted)', fontSize: 11 }}
                tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              />
              <YAxis
                dataKey="y" name="Volume ($B)"
                label={{ value: 'Remittances Received ($B)', angle: -90, position: 'insideLeft', fill: 'var(--muted)', fontSize: 11 }}
                tick={{ fill: 'var(--muted)', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={8} stroke="rgba(255,107,53,0.4)" strokeDasharray="4 4" label={{ value: 'High Cost Threshold', fill: 'var(--accent2)', fontSize: 10 }} />
              <ReferenceLine y={5} stroke="rgba(0,229,160,0.4)" strokeDasharray="4 4" label={{ value: 'High Volume', fill: 'var(--accent)', fontSize: 10 }} />
              <Scatter data={scatterData} fill="var(--accent)">
                {scatterData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={REGION_COLORS[entry.region] || 'var(--accent)'}
                    opacity={0.85}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {Object.entries(REGION_COLORS).map(([region, color]) => (
              <div key={region} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                {region}
              </div>
            ))}
          </div>
        </div>

        {/* Market Prioritization Table */}
        <div className="card">
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Market Prioritization Ranking</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              Market Inefficiency Score = avg_corridor_cost × volume_$B × remittances_%GDP
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['#', 'Country', 'Volume $B', 'Cost %', 'GDP %', 'Score'].map(h => (
                    <th key={h} style={{ padding: '6px 8px', textAlign: 'left', color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scored.slice(0, 12).map((row, i) => (
                  <tr key={row.country} style={{ borderBottom: '1px solid rgba(35,39,54,0.5)', background: i < 3 ? 'rgba(0,229,160,0.04)' : 'transparent' }}>
                    <td style={{ padding: '7px 8px', fontFamily: 'IBM Plex Mono, monospace', color: i < 3 ? 'var(--accent)' : 'var(--muted)', fontWeight: 700 }}>{i + 1}</td>
                    <td style={{ padding: '7px 8px', fontWeight: i < 3 ? 700 : 400 }}>
                      <span style={{ color: REGION_COLORS[row.region] || 'var(--text)' }}>●</span>{' '}{row.country}
                    </td>
                    <td style={{ padding: '7px 8px', fontFamily: 'IBM Plex Mono, monospace' }}>${row.received_bn}B</td>
                    <td style={{ padding: '7px 8px', fontFamily: 'IBM Plex Mono, monospace', color: row.avgCost > 10 ? 'var(--accent2)' : 'var(--text)' }}>{row.avgCost?.toFixed(1)}%</td>
                    <td style={{ padding: '7px 8px', fontFamily: 'IBM Plex Mono, monospace' }}>{row.gdp_pct}%</td>
                    <td style={{ padding: '7px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          height: 6, borderRadius: 3,
                          width: `${Math.min(100, (row.score / scored[0].score) * 100)}%`,
                          background: i < 3 ? 'var(--accent)' : i < 6 ? 'var(--accent3)' : 'var(--muted)',
                          minWidth: 20,
                        }} />
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: i < 3 ? 'var(--accent)' : 'var(--text)', fontWeight: i < 3 ? 700 : 400, fontSize: 11 }}>{row.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div style={{
        background: 'rgba(0,229,160,0.05)',
        border: '1px solid rgba(0,229,160,0.2)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: 8,
        padding: '16px 20px',
        fontSize: 12,
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--accent)' }}>Strategic Insight:</strong>{' '}
        Egypt, Nigeria, Morocco and Somalia represent the highest-priority entry markets, combining large remittance volumes,
        GDP dependency (5.5%–20%), and corridor costs 7–38x higher than Wise's current fee. 
        Even capturing <strong>1% of the Nigeria corridor</strong> ($195M volume) at 0.6% fee yields <strong>~$1.2M incremental revenue</strong> — 
        additive to Wise's existing P&L without any price increase.
      </div>
    </div>
  )
}
