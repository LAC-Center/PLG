'use client'
import { RISKS } from '@/lib/data'

const SEV_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#f59e0b',
  low: '#6b7280',
}
const PROB_COLORS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#00e5a0',
}

const RISK_MATRIX_DATA = RISKS.map(r => ({
  ...r,
  probScore: r.probability === 'high' ? 3 : r.probability === 'medium' ? 2 : 1,
  sevScore: r.severity === 'critical' ? 4 : r.severity === 'high' ? 3 : r.severity === 'medium' ? 2 : 1,
}))

export default function RiskDashboard() {
  const criticalRisks = RISKS.filter(r => r.severity === 'critical' || (r.severity === 'high' && r.probability === 'high'))

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Risk Dashboard</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          Maps the key execution risks across regulatory, AML/fraud, operational, and strategic dimensions. 
          Each risk includes a measurable proxy indicator and mitigation approach.
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalRisks.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--danger)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="live-dot" style={{ background: 'var(--danger)' }} />
            CRITICAL RISK ITEMS REQUIRING BOARD-LEVEL ATTENTION
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {criticalRisks.map(r => (
              <div key={r.risk} style={{
                flex: 1, minWidth: 280,
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderLeft: '4px solid var(--danger)',
                borderRadius: 8, padding: 14,
              }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <span style={{
                    fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                    background: 'rgba(239,68,68,0.15)', color: 'var(--danger)',
                    padding: '2px 6px', borderRadius: 4, fontWeight: 700,
                  }}>{r.category.toUpperCase()}</span>
                  <span style={{
                    fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                    background: 'rgba(239,68,68,0.1)', color: 'var(--danger)',
                    padding: '2px 6px', borderRadius: 4,
                  }}>{r.severity.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{r.risk}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.mitigation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Risk Matrix */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Risk Heat Matrix</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>Severity × Probability</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: 4, fontSize: 10 }}>
            <div style={{ color: 'var(--muted)' }} />
            {['Low Prob', 'Med Prob', 'High Prob'].map(p => (
              <div key={p} style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--muted)', textAlign: 'center', padding: '4px 0' }}>{p}</div>
            ))}
            {[4,3,2,1].map(sev => {
              const sevLabel = sev === 4 ? 'Critical' : sev === 3 ? 'High' : sev === 2 ? 'Medium' : 'Low'
              return [
                <div key={`label-${sev}`} style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--muted)', display: 'flex', alignItems: 'center', paddingRight: 8, fontSize: 9 }}>{sevLabel}</div>,
                ...[1,2,3].map(prob => {
                  const risks = RISK_MATRIX_DATA.filter(r => r.sevScore === sev && r.probScore === prob)
                  const heatScore = sev * prob
                  const bg = heatScore >= 9 ? 'rgba(239,68,68,0.2)' : heatScore >= 6 ? 'rgba(249,115,22,0.15)' : heatScore >= 4 ? 'rgba(245,158,11,0.12)' : 'rgba(107,114,128,0.08)'
                  const border = heatScore >= 9 ? 'rgba(239,68,68,0.4)' : heatScore >= 6 ? 'rgba(249,115,22,0.3)' : heatScore >= 4 ? 'rgba(245,158,11,0.2)' : 'var(--border)'
                  return (
                    <div key={`${sev}-${prob}`} style={{
                      background: bg, border: `1px solid ${border}`,
                      borderRadius: 6, padding: '8px 6px',
                      minHeight: 60, fontSize: 10, lineHeight: 1.3,
                    }}>
                      {risks.map(r => (
                        <div key={r.risk} style={{ color: 'var(--text)', marginBottom: 2, fontSize: 9 }}>
                          <span style={{ color: SEV_COLORS[r.severity] }}>●</span> {r.category}
                        </div>
                      ))}
                    </div>
                  )
                })
              ]
            })}
          </div>
        </div>

        {/* Risk by Category */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Risk Distribution by Category</div>
          {(['Regulatory', 'AML/Fraud', 'Operational', 'Strategic'] as const).map(cat => {
            const catRisks = RISKS.filter(r => r.category === cat)
            const avgSev = catRisks.reduce((s, r) => s + (r.severity === 'critical' ? 4 : r.severity === 'high' ? 3 : r.severity === 'medium' ? 2 : 1), 0) / catRisks.length
            return (
              <div key={cat} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ fontWeight: 700 }}>{cat}</span>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: avgSev > 2.5 ? 'var(--danger)' : avgSev > 1.8 ? 'var(--warn)' : 'var(--muted)' }}>
                    {catRisks.length} risks · Avg: {avgSev > 2.5 ? 'HIGH' : avgSev > 1.8 ? 'MED' : 'LOW'}
                  </span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                  <div style={{
                    height: '100%', borderRadius: 3, width: `${(avgSev / 4) * 100}%`,
                    background: avgSev > 2.5 ? 'var(--danger)' : avgSev > 1.8 ? 'var(--warn)' : 'var(--accent)',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full Risk Table */}
      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Complete Risk Register</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Category', 'Risk', 'Severity', 'Probability', 'Proxy Indicator', 'Mitigation'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600, fontSize: 10 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RISKS.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(35,39,54,0.5)', background: r.severity === 'critical' ? 'rgba(239,68,68,0.04)' : 'transparent' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      padding: '2px 6px', borderRadius: 3, whiteSpace: 'nowrap',
                    }}>{r.category}</span>
                  </td>
                  <td style={{ padding: '10px 12px', maxWidth: 200, lineHeight: 1.4 }}>{r.risk}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ color: SEV_COLORS[r.severity], fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}>{r.severity}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ color: PROB_COLORS[r.probability], fontFamily: 'IBM Plex Mono, monospace', textTransform: 'capitalize', fontSize: 10 }}>{r.probability}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--muted)', maxWidth: 200, lineHeight: 1.4, fontSize: 10 }}>{r.proxy}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--muted)', maxWidth: 220, lineHeight: 1.4, fontSize: 10 }}>{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
