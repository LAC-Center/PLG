'use client'
export default function HypothesisBar() {
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0a1a12 0%, #0a0b0e 100%)',
      borderBottom: '1px solid rgba(0,229,160,0.2)',
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}>
      <div style={{
        fontSize: 10,
        fontFamily: 'IBM Plex Mono, monospace',
        color: 'var(--accent)',
        background: 'rgba(0,229,160,0.1)',
        padding: '3px 8px',
        borderRadius: 4,
        border: '1px solid rgba(0,229,160,0.3)',
        whiteSpace: 'nowrap',
        fontWeight: 600,
      }}>
        HYPOTHESIS UNDER TEST
      </div>
      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.4 }}>
        <strong style={{ color: 'var(--accent)' }}>Wise can grow revenues without raising prices</strong>
        {' '}by expanding into high-cost African remittance corridors — leveraging netting infrastructure to capture volume, 
        reduce unit costs, and{' '}
        <strong style={{ color: 'var(--accent3)' }}>decrease structural dependency on interest income</strong>.
      </div>
    </div>
  )
}
