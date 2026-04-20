'use client'
import { useState } from 'react'
import { SIGNALS } from '@/lib/data'

const CAT_COLORS: Record<string, string> = {
  'Growth': 'var(--accent)',
  'Efficiency': 'var(--accent3)',
  'Revenue Mix': '#a78bfa',
  'Unit Economics': 'var(--warn)',
  'Product': 'var(--accent)',
  'Operations': 'var(--accent3)',
  'AML/Fraud': 'var(--danger)',
  'Regulatory': 'var(--accent2)',
  'Financials': 'var(--danger)',
  'Competition': 'var(--warn)',
}

export default function SignalsPanel() {
  const [activeTab, setActive] = useState<'early' | 'failure'>('early')

  const signals = activeTab === 'early' ? SIGNALS.early : SIGNALS.failure

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Signal Intelligence Panel</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 700 }}>
          Operationalizes the hypothesis validation: defines the measurable signals that tell you 
          whether the strategy is working (early signals) or failing (failure signals), before it's too late to course-correct.
        </div>
      </div>

      {/* Validation Logic Box */}
      <div style={{
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 8, padding: 20, marginBottom: 24,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>
          HOW THIS DASHBOARD VALIDATES THE HYPOTHESIS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            {
              step: '01',
              title: 'Market Sizing',
              desc: 'Tab 1 identifies $89.7B market with structural pricing inefficiencies (13–23% corridor costs vs. 0.6% Wise fee). Validates the opportunity is real and large.',
              validated: true,
            },
            {
              step: '02',
              title: 'Revenue Modelling',
              desc: 'Tab 2 shows that even 1% capture adds $537M in transaction volume and $3.2M+ revenue at 0.6% — pure additive without any price increase.',
              validated: true,
            },
            {
              step: '03',
              title: 'Interest Dependency',
              desc: 'Tab 3 proves that Africa expansion shifts revenue mix from ~24% interest income to ~14% by 2028, reducing rate sensitivity.',
              validated: true,
            },
            {
              step: '04',
              title: 'Operating Leverage',
              desc: 'Tab 4 shows cost-per-transaction falls as volume grows. Africa adds volume, which reduces unit costs and improves margins without touching fee rates.',
              validated: true,
            },
            {
              step: '05',
              title: 'Execution Feasibility',
              desc: 'Tab 5 phases the strategy to manage risk: partnerships first, then integration, then own infrastructure — reducing capex risk.',
              validated: true,
            },
            {
              step: '06',
              title: 'Risk-Adjusted Verdict',
              desc: 'Tab 6 + 7 define measurable risk proxies and success/failure signals so the hypothesis can be falsified with data, not just theory.',
              validated: true,
            },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12 }}>
              <div style={{
                minWidth: 28, height: 28, borderRadius: '50%',
                background: 'var(--accent)', color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, fontFamily: 'IBM Plex Mono, monospace',
              }}>{item.step}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signal Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setActive('early')}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'IBM Plex Mono, monospace',
            background: activeTab === 'early' ? 'var(--accent)' : 'var(--surface)',
            color: activeTab === 'early' ? '#000' : 'var(--muted)',
            border: activeTab === 'early' ? 'none' : '1px solid var(--border)',
          }}
        >
          ✅ Early Signals ({SIGNALS.early.length})
        </button>
        <button
          onClick={() => setActive('failure')}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: 12, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'IBM Plex Mono, monospace',
            background: activeTab === 'failure' ? 'var(--danger)' : 'var(--surface)',
            color: activeTab === 'failure' ? '#fff' : 'var(--muted)',
            border: activeTab === 'failure' ? 'none' : '1px solid var(--border)',
          }}
        >
          🚨 Failure Signals ({SIGNALS.failure.length})
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
        {signals.map((s, i) => {
          const isFailure = activeTab === 'failure'
          const accentColor = isFailure ? 'var(--danger)' : 'var(--accent)'
          const catColor = CAT_COLORS[s.category] || 'var(--muted)'
          return (
            <div key={i} style={{
              background: 'var(--surface)',
              border: `1px solid ${isFailure ? 'rgba(239,68,68,0.25)' : 'rgba(0,229,160,0.2)'}`,
              borderLeft: `4px solid ${accentColor}`,
              borderRadius: 8, padding: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.4, flex: 1, paddingRight: 8 }}>{s.signal}</div>
                <div style={{
                  fontSize: 9, fontFamily: 'IBM Plex Mono, monospace',
                  color: catColor, background: `${catColor}15`,
                  border: `1px solid ${catColor}40`,
                  borderRadius: 4, padding: '2px 6px', whiteSpace: 'nowrap', fontWeight: 700,
                }}>
                  {s.category}
                </div>
              </div>
              <div style={{
                background: isFailure ? 'rgba(239,68,68,0.06)' : 'rgba(0,229,160,0.06)',
                borderRadius: 6, padding: '8px 12px',
                fontSize: 11, fontFamily: 'IBM Plex Mono, monospace',
                color: isFailure ? 'var(--danger)' : 'var(--accent)',
                lineHeight: 1.5,
              }}>
                {isFailure ? '⚠ ALERT IF: ' : '✓ TARGET: '}{s.threshold}
              </div>
              <div style={{
                marginTop: 8, fontSize: 9, color: 'var(--muted)',
                fontFamily: 'IBM Plex Mono, monospace',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--muted)' }} />
                {isFailure ? 'Triggers strategy review / pivot decision' : 'Leading indicator of hypothesis validation'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Verdict Box */}
      <div style={{
        marginTop: 24,
        background: 'linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(79,142,247,0.08) 100%)',
        border: '1px solid rgba(0,229,160,0.3)',
        borderRadius: 12, padding: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 12, color: 'var(--accent)' }}>
          HYPOTHESIS VERDICT — CURRENT STATE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
          {[
            { label: 'Market Opportunity', verdict: 'CONFIRMED', detail: 'Data validates $89.7B TAM with 13-23% corridor costs', color: 'var(--accent)' },
            { label: 'Revenue Additionality', verdict: 'CONFIRMED', detail: 'Simulations show $537M–$4.5B incremental volume at 0.6% fee', color: 'var(--accent)' },
            { label: 'Interest Dependency Reduction', verdict: 'LIKELY', detail: 'Fee mix improves to ~86% by 2028E; rate sensitivity drops significantly', color: 'var(--accent3)' },
          ].map(v => (
            <div key={v.label} style={{
              background: 'var(--surface2)', borderRadius: 8, padding: 16,
              border: `1px solid ${v.color}30`,
            }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>{v.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: v.color, marginBottom: 6 }}>{v.verdict}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>{v.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text)' }}>Overall Assessment:</strong>{' '}
          The data strongly supports the hypothesis. The primary uncertainty is <strong style={{ color: 'var(--warn)' }}>execution risk</strong>, 
          not market opportunity. Phase 1 partnership model limits downside. 
          If early signals (volume activation rate, fraud metrics, partner uptime) trend positively within 12 months of launch, 
          the hypothesis transitions from <em>plausible</em> to <em>proven</em>.
        </div>
      </div>
    </div>
  )
}
