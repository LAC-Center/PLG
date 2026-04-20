'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { REVENUE_MIX, WISE_FINANCIALS } from '@/lib/data'

const COLORS = ['var(--accent)', 'var(--accent3)', '#a78bfa']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', fontSize: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6, fontFamily: 'IBM Plex Mono, monospace' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, fontFamily: 'IBM Plex Mono, monospace' }}>
          {p.name}: ${p.value?.toFixed ? p.value.toFixed(0) : p.value}M
        </div>
      ))}
    </div>
  )
}

export default function RevenueStructure() {
  const latest = REVENUE_MIX[REVENUE_MIX.length - 1]

  const pieData2025 = [
    { name: 'Transaction Fees', value: latest.txnFees },
    { name: 'Net Interest Income', value: latest.interest },
  ]

  // Projected 2028 with Africa (fee revenue grows, interest stable or declining)
  const pie2028Africa = [
    { name: 'Transaction Fees (incl. Africa)', value: latest.txnFees * 1.45 + 320 },
    { name: 'Net Interest Income', value: latest.interest * 0.85 },
  ]

  const areaData = WISE_FINANCIALS.map(d => ({
    year: d.year.toString(),
    fees: d.revenue,
    interest: Math.max(0, d.interestIncome + d.benefitPaid),
    total: d.income,
  })).concat([
    { year: '2026E', fees: 1350, interest: 380, total: 1730 },
    { year: '2027E', fees: 1600, interest: 340, total: 1940 },
    { year: '2028E', fees: 1920, interest: 310, total: 2230 },
  ])

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Revenue Structure Analysis</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          Maps the evolution of Wise's revenue composition, showing how Africa expansion rebalances the mix 
          away from interest income dependency (a rate-sensitive, non-structural source) toward durable transaction fees.
        </div>
      </div>

      {/* Risk Alert */}
      <div style={{
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 12,
      }}>
        <div style={{ fontSize: 20 }}>⚠️</div>
        <div>
          <strong style={{ color: 'var(--danger)' }}>Revenue Risk Concentration:</strong>{' '}
          In FY2025, net interest income represents <strong>{((388.1 / 1600) * 100).toFixed(1)}%</strong> of total income ($388M).
          A 150bps rate cut cycle (e.g., Fed cutting 2025-2026) could reduce this by <strong>~$160-200M</strong> — 
          equivalent to 16% of Wise's 2025 total income. Africa expansion directly hedges this exposure.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Pie Charts: Before / After */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Revenue Mix: 2025 vs. 2028E (with Africa)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, textAlign: 'center', fontFamily: 'IBM Plex Mono, monospace' }}>2025 ACTUAL</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData2025} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                    {pieData2025.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {pieData2025.map((d, i) => (
                  <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                      <span style={{ color: 'var(--muted)' }}>{d.name}</span>
                    </div>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700 }}>{((d.value / latest.totalIncome) * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 8, textAlign: 'center', fontFamily: 'IBM Plex Mono, monospace' }}>2028E WITH AFRICA</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pie2028Africa} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                    {pie2028Africa.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              {(() => {
                const total2028 = pie2028Africa.reduce((s, d) => s + d.value, 0)
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {pie2028Africa.map((d, i) => (
                      <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
                          <span style={{ color: 'var(--muted)' }}>{d.name}</span>
                        </div>
                        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text)' }}>{((d.value / total2028) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          </div>
          <div style={{
            marginTop: 16,
            background: 'rgba(0,229,160,0.05)',
            borderRadius: 6,
            padding: '10px 14px',
            fontSize: 11,
            color: 'var(--muted)',
          }}>
            Africa expansion <span style={{ color: 'var(--accent)', fontWeight: 700 }}>reduces interest income dependency from ~24% → ~14%</span> of total revenue mix, 
            structurally improving earnings quality and multiple.
          </div>
        </div>

        {/* Revenue trend area chart */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Income Composition Trend</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>Fee revenue vs. interest income trajectory ($M)</div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData} margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="fees" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="interest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent3)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
              <YAxis tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <Area type="monotone" dataKey="fees" name="Transaction Fees" stroke="var(--accent)" fill="url(#fees)" strokeWidth={2} />
              <Area type="monotone" dataKey="interest" name="Net Interest Income" stroke="var(--accent3)" fill="url(#interest)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue KPIs Timeline */}
      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Wise Revenue KPIs — Historical Trajectory</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {WISE_FINANCIALS.map(d => (
            <div key={d.year} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '14px' }}>
              <div style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--muted)', marginBottom: 8 }}>{d.year}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--accent)', marginBottom: 4 }}>${d.income}M</div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>Total Income</div>
              <div style={{ borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                  <span style={{ color: 'var(--muted)' }}>Fee rev</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>${d.revenue}M</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                  <span style={{ color: 'var(--muted)' }}>Interest net</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: d.interestIncome > 50 ? 'var(--accent2)' : 'var(--muted)' }}>
                    ${Math.max(0, d.interestIncome + d.benefitPaid).toFixed(0)}M
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                  <span style={{ color: 'var(--muted)' }}>Op. income</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent3)' }}>${d.operatingIncome}M</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
