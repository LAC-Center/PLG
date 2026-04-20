'use client'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts'
import { OPERATING_LEVERAGE } from '@/lib/data'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const isProjected = payload[0]?.payload?.projected
  return (
    <div style={{ background: 'var(--surface2)', border: `1px solid ${isProjected ? 'rgba(0,229,160,0.4)' : 'var(--border)'}`, borderRadius: 8, padding: '12px 16px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, fontFamily: 'IBM Plex Mono, monospace', color: isProjected ? 'var(--accent)' : 'var(--text)' }}>
        {label} {isProjected ? '(Projected)' : ''}
      </div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, fontFamily: 'IBM Plex Mono, monospace', marginBottom: 2 }}>
          {p.name}: {p.dataKey === 'cost_per_txn' ? `$${p.value}` : `$${p.value}B`}
        </div>
      ))}
    </div>
  )
}

export default function OperatingLeverage() {
  const data = OPERATING_LEVERAGE.map(d => ({
    ...d,
    year: d.year.toString(),
    fill: d.projected ? 'rgba(0,229,160,0.25)' : 'rgba(79,142,247,0.5)',
  }))

  const reduction = ((OPERATING_LEVERAGE[0].cost_per_txn - OPERATING_LEVERAGE[OPERATING_LEVERAGE.length - 1].cost_per_txn) / OPERATING_LEVERAGE[0].cost_per_txn * 100).toFixed(0)
  const volumeGrowth = ((OPERATING_LEVERAGE[OPERATING_LEVERAGE.length - 1].volume_bn / OPERATING_LEVERAGE[0].volume_bn) * 100 - 100).toFixed(0)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Operating Leverage Model</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          Demonstrates Wise's structural operating leverage: as volume scales, cost-per-transaction falls due to 
          netting efficiency, fixed-cost spread, and infrastructure amortisation. Africa expansion accelerates this curve.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'COST/TXN 2019', value: '$3.20', color: 'var(--muted)' },
          { label: 'COST/TXN 2025', value: '$0.76', color: 'var(--accent)' },
          { label: 'COST REDUCTION', value: `-${reduction}%`, color: 'var(--accent)' },
          { label: 'VOLUME GROWTH', value: `+${volumeGrowth}%`, color: 'var(--accent3)' },
          { label: 'PROJ. COST/TXN 2028', value: '$0.50', color: '#a78bfa' },
          { label: 'AFRICA LEVER', value: '+110B vol', color: 'var(--accent2)' },
        ].map(k => (
          <div key={k.label} className="card-sm" style={{ flex: 1, minWidth: 120 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Volume vs. Cost Per Transaction</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>
            <span style={{ color: 'var(--accent3)' }}>■</span> Historical{' '}
            <span style={{ color: 'rgba(0,229,160,0.6)', marginLeft: 8 }}>■</span> Projected (w/ Africa)
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data} margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
              <YAxis yAxisId="vol" orientation="left" tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} label={{ value: 'Volume ($B)', angle: -90, position: 'insideLeft', fill: 'var(--muted)', fontSize: 10, dy: 40 }} />
              <YAxis yAxisId="cost" orientation="right" tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} label={{ value: 'Cost/Txn ($)', angle: 90, position: 'insideRight', fill: 'var(--muted)', fontSize: 10, dy: -30 }} domain={[0, 4]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine yAxisId="vol" x="2025" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" label={{ value: '← Actual | Projected →', fill: 'var(--muted)', fontSize: 9 }} />
              <Bar yAxisId="vol" dataKey="volume_bn" name="Volume ($B)" fill="var(--accent3)" opacity={0.6} radius={[3, 3, 0, 0]}>
              </Bar>
              <Line yAxisId="cost" type="monotone" dataKey="cost_per_txn" name="Cost/Txn ($)" stroke="var(--accent2)" strokeWidth={2.5} dot={{ fill: 'var(--accent2)', r: 4 }} strokeDasharray="0" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Operating Leverage Logic</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Netting Efficiency', desc: 'Higher Africa volume means more offsetting flows — less FX trade required per dollar moved. Cost falls non-linearly.', impact: 'High', color: 'var(--accent)' },
              { title: 'Fixed Cost Amortisation', desc: 'Compliance, licensing, technology, and treasury are largely fixed. Africa volume amortises these over a larger base.', impact: 'High', color: 'var(--accent)' },
              { title: 'API Platform Reuse', desc: 'Core infrastructure already built. Marginal cost of adding new corridor via API integration is near zero.', impact: 'Medium', color: 'var(--accent3)' },
              { title: 'Float Pool Economies', desc: 'Larger float in local currencies enables better FX hedging and lower conversion costs.', impact: 'Medium', color: 'var(--accent3)' },
              { title: 'Regulatory Learning Curve', desc: 'Compliance patterns repeat. Phase 1 insights reduce Phase 2-3 regulatory cost per market.', impact: 'Low-Med', color: 'var(--warn)' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: 60, fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                  color: item.color, background: `${item.color}15`,
                  border: `1px solid ${item.color}40`, borderRadius: 4,
                  padding: '3px 6px', textAlign: 'center', fontWeight: 700, marginTop: 2,
                }}>
                  {item.impact}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: 'rgba(0,229,160,0.05)',
        border: '1px solid rgba(0,229,160,0.15)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: 8,
        padding: '14px 20px',
        fontSize: 12, lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--accent)' }}>Why this validates the hypothesis:</strong>{' '}
        If Africa adds $110B in volume by 2028 (base case), and cost-per-transaction falls from $0.76 → $0.50, 
        Wise would save approximately <strong>$28–35M in operating costs annually</strong> — 
        improving gross margin even as fee rates stay at 0.6%. Revenue grows; price doesn't move; margin expands.
      </div>
    </div>
  )
}
