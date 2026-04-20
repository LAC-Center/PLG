'use client'
export default function Header() {
  return (
    <div style={{
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '20px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#000' }}>W</span>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.5px' }}>
            Wise Africa Expansion
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>
            Strategic Revenue Hypothesis Dashboard
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>TOTAL ADDRESSABLE</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent)' }}>$89.7B</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>Africa remittance market</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>AVG CORRIDOR COST</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent2)' }}>13.4%</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'IBM Plex Mono, monospace' }}>vs. Wise 0.6% fee</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="live-dot" />
          <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>LIVE DATA</span>
        </div>
      </div>
    </div>
  )
}
