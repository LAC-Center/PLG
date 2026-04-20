'use client'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { STRATEGY_PHASES } from '@/lib/data'

const STATUS_COLORS: Record<string, string> = {
  active: 'var(--accent)',
  upcoming: 'var(--accent3)',
  future: 'var(--muted)',
}

const STATUS_LABELS: Record<string, string> = {
  active: 'ACTIVE',
  upcoming: 'UPCOMING',
  future: 'FUTURE',
}

const RADAR_DATA = [
  { metric: 'Volume %', p1: 15, p2: 35, p3: 50 },
  { metric: 'Op. Control', p1: 20, p2: 60, p3: 90 },
  { metric: 'Margin', p1: 30, p2: 55, p3: 80 },
  { metric: 'Risk', p1: 70, p2: 50, p3: 35 },
  { metric: 'Speed to mkt', p1: 90, p2: 60, p3: 30 },
  { metric: 'Scalability', p1: 40, p2: 70, p3: 95 },
]

export default function StrategyTracker() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Strategy Execution Tracker</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          The hybrid expansion model — Partnership → Integration → Own Infrastructure — 
          balances speed-to-market with long-term operational control and margin improvement.
          Each phase unlocks new KPIs and success thresholds.
        </div>
      </div>

      {/* Timeline Visual */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 28, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--accent) 33%, var(--accent3) 66%, var(--border) 100%)',
          zIndex: 0,
        }} />
        {STRATEGY_PHASES.map((phase, i) => (
          <div key={phase.id} style={{ flex: 1, zIndex: 1, padding: '0 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: phase.status === 'active' ? 'var(--accent)' : phase.status === 'upcoming' ? 'var(--surface2)' : 'var(--surface)',
                border: `3px solid ${STATUS_COLORS[phase.status]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 18,
                color: phase.status === 'active' ? '#000' : STATUS_COLORS[phase.status],
              }}>
                {i + 1}
              </div>
            </div>
            <div className="card" style={{ borderColor: `${STATUS_COLORS[phase.status]}40` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{phase.name}</div>
                <div style={{
                  fontSize: 9, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700,
                  color: STATUS_COLORS[phase.status],
                  background: `${STATUS_COLORS[phase.status]}15`,
                  border: `1px solid ${STATUS_COLORS[phase.status]}40`,
                  borderRadius: 4, padding: '2px 6px',
                }}>
                  {STATUS_LABELS[phase.status]}
                </div>
              </div>
              <div style={{ fontSize: 10, fontFamily: 'IBM Plex Mono, monospace', color: 'var(--muted)', marginBottom: 10 }}>{phase.period}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14 }}>{phase.description}</div>

              {/* Metrics */}
              <div style={{ marginBottom: 14 }}>
                {phase.metrics.map(m => (
                  <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11 }}>
                    <span style={{ color: 'var(--muted)' }}>{m.label}</span>
                    <span style={{
                      fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600,
                      color: m.trend === 'up' ? 'var(--accent)' : m.trend === 'down' ? 'var(--danger)' : 'var(--muted)',
                    }}>{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div style={{ marginBottom: 14 }}>
                {[
                  { label: 'Volume Coverage', value: phase.volumePct },
                  { label: 'Operational Control', value: phase.operationalControl },
                ].map(bar => (
                  <div key={bar.label} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>
                      <span>{bar.label}</span><span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{bar.value}%</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
                      <div style={{
                        height: '100%', borderRadius: 2,
                        width: `${bar.value}%`,
                        background: STATUS_COLORS[phase.status],
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Risks */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>KEY RISKS</div>
                {phase.risks.map(r => (
                  <div key={r} style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3, display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--danger)' }}>▸</span>{r}
                  </div>
                ))}
              </div>

              {/* Early signals */}
              <div style={{ marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 6 }}>EARLY SUCCESS SIGNALS</div>
                {phase.earlySignals.map(s => (
                  <div key={s} style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3, display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span>{s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Radar Chart */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Phase Capability Profile</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>Tradeoffs across 6 dimensions by phase (0–100 score)</div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
              <Radar name="Phase 1" dataKey="p1" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Phase 2" dataKey="p2" stroke="var(--accent3)" fill="var(--accent3)" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Phase 3" dataKey="p3" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: 11, borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 11, fontFamily: 'IBM Plex Mono, monospace' }}>
            {[['Phase 1', 'var(--accent)'], ['Phase 2', 'var(--accent3)'], ['Phase 3', '#a78bfa']].map(([label, color]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 12, height: 2, background: color as string }} /><span style={{ color: 'var(--muted)' }}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Triggers */}
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Phase Transition Triggers</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>Criteria that must be met before advancing to the next phase</div>
          {[
            {
              from: 'Phase 1 → Phase 2', color: 'var(--accent)',
              criteria: [
                '≥ 3 corridors live with > $50M monthly volume',
                'Fraud rate < 0.5% across partnership corridors',
                'Regulatory clarity in ≥ 2 tier-1 markets',
                'Positive contribution margin per corridor',
              ]
            },
            {
              from: 'Phase 2 → Phase 3', color: 'var(--accent3)',
              criteria: [
                '≥ 1 direct banking licence in key market',
                'API platform serving ≥ 20 active partners',
                'Cost-per-transaction below $0.60 in Phase 2 corridors',
                'Legal entity established in ≥ 3 African markets',
              ]
            }
          ].map(stage => (
            <div key={stage.from} style={{
              marginBottom: 16, background: 'var(--surface2)', borderRadius: 8, padding: 16,
              border: `1px solid ${stage.color}30`,
            }}>
              <div style={{ fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', color: stage.color, fontWeight: 700, marginBottom: 10 }}>
                {stage.from}
              </div>
              {stage.criteria.map(c => (
                <div key={c} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 5, display: 'flex', gap: 6 }}>
                  <span style={{ color: stage.color }}>→</span>{c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
