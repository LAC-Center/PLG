'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import MarketOpportunity from '@/components/MarketOpportunity'
import FinancialSimulation from '@/components/FinancialSimulation'
import RevenueStructure from '@/components/RevenueStructure'
import OperatingLeverage from '@/components/OperatingLeverage'
import StrategyTracker from '@/components/StrategyTracker'
import RiskDashboard from '@/components/RiskDashboard'
import SignalsPanel from '@/components/SignalsPanel'
import HypothesisBar from '@/components/HypothesisBar'

const TABS = [
  { id: 'market',    label: '01 Market Opportunity' },
  { id: 'financial', label: '02 Financial Simulation' },
  { id: 'revenue',   label: '03 Revenue Structure' },
  { id: 'leverage',  label: '04 Operating Leverage' },
  { id: 'strategy',  label: '05 Strategy Tracker' },
  { id: 'risk',      label: '06 Risk Dashboard' },
  { id: 'signals',   label: '07 Signals' },
]

export default function Page() {
  const [active, setActive] = useState('market')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header />
      <HypothesisBar />
      
      {/* Tab Navigation */}
      <div style={{ 
        borderBottom: '1px solid var(--border)', 
        padding: '0 32px',
        overflowX: 'auto',
        display: 'flex',
        gap: 8,
        paddingTop: 8,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={active === t.id ? 'tab-active' : 'tab-inactive'}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'IBM Plex Mono, monospace',
              whiteSpace: 'nowrap',
              border: active === t.id ? 'none' : '1px solid var(--border)',
              borderBottom: 'none',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px', maxWidth: 1400, margin: '0 auto' }}>
        {active === 'market'    && <MarketOpportunity />}
        {active === 'financial' && <FinancialSimulation />}
        {active === 'revenue'   && <RevenueStructure />}
        {active === 'leverage'  && <OperatingLeverage />}
        {active === 'strategy'  && <StrategyTracker />}
        {active === 'risk'      && <RiskDashboard />}
        {active === 'signals'   && <SignalsPanel />}
      </div>

      <footer style={{ 
        borderTop: '1px solid var(--border)', 
        padding: '16px 32px', 
        color: 'var(--muted)',
        fontSize: 11,
        fontFamily: 'IBM Plex Mono, monospace',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>DATA: World Bank WDI · Wise Annual Reports 2021–2025 · World Bank RPW (Q3-2020)</span>
        <span>HYPOTHESIS VALIDATION DASHBOARD v1.0 · CONFIDENTIAL</span>
      </footer>
    </div>
  )
}
