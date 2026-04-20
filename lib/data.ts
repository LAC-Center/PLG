// ============================================================
// DATA MODULE — Wise Africa Expansion Dashboard
// Sources: World Bank WDI, Wise Annual Reports 2021-2025,
//          World Bank Remittance Prices Worldwide (RPW)
// ============================================================

export const WISE_FINANCIALS = [
  { year: 2021, revenue: 421,  interestIncome: 0,     benefitPaid: 0,      income: 421,    grossProfit: 260.5, operatingIncome: 44.9,  netProfit: 30.9  },
  { year: 2022, revenue: 559.9, interestIncome: 3.9,  benefitPaid: 0,      income: 563.8,  grossProfit: 369.1, operatingIncome: 48.7,  netProfit: 32.9  },
  { year: 2023, revenue: 846.1, interestIncome: 140.2, benefitPaid: -22.1, income: 964.2,  grossProfit: 638.2, operatingIncome: 157.2, netProfit: 114.0 },
  { year: 2024, revenue: 1052,  interestIncome: 485.2, benefitPaid: -124.9, income: 1412.3, grossProfit: 1092.4, operatingIncome: 501.9, netProfit: 354.6 },
  { year: 2025, revenue: 1211.9, interestIncome: 549.3, benefitPaid: -161.2, income: 1600.0, grossProfit: 1307.8, operatingIncome: 579.6, netProfit: 416.7 },
]

// Derived: interest income as % of total income
export const REVENUE_MIX = WISE_FINANCIALS.map(d => ({
  year: d.year,
  txnFeesPct: Math.round(d.revenue / d.income * 100 * 10) / 10,
  interestPct: Math.round(Math.max(0, d.interestIncome + d.benefitPaid) / d.income * 100 * 10) / 10,
  txnFees: d.revenue,
  interest: Math.max(0, d.interestIncome + d.benefitPaid),
  totalIncome: d.income,
}))

// ---- CORRIDOR DATA (Real: World Bank RPW Q3-2020) ----
// Africa corridors with average total cost to remit
export const CORRIDOR_DATA: CorridorRow[] = [
  // Highest-cost corridors from the data
  { sending: 'Tanzania',     receiving: 'Uganda',       cost: 23.71, region: 'East Africa' },
  { sending: 'South Africa', receiving: 'Angola',       cost: 22.04, region: 'Southern Africa' },
  { sending: 'South Africa', receiving: 'Botswana',     cost: 20.73, region: 'Southern Africa' },
  { sending: 'Angola',       receiving: 'Namibia',       cost: 19.09, region: 'Southern Africa' },
  { sending: 'Tanzania',     receiving: 'Kenya',         cost: 19.00, region: 'East Africa' },
  { sending: 'Nigeria',      receiving: 'Togo',          cost: 17.35, region: 'West Africa' },
  { sending: 'Nigeria',      receiving: 'Benin',         cost: 17.35, region: 'West Africa' },
  { sending: 'Cameroon',     receiving: 'Nigeria',       cost: 14.69, region: 'West Africa' },
  { sending: 'South Africa', receiving: 'Zimbabwe',      cost: 14.50, region: 'Southern Africa' },
  { sending: 'South Africa', receiving: 'Mozambique',    cost: 13.80, region: 'Southern Africa' },
  { sending: 'Australia',    receiving: 'Zimbabwe',      cost: 9.60,  region: 'Global→Africa' },
  { sending: 'Australia',    receiving: 'Somalia',       cost: 9.05,  region: 'Global→Africa' },
  { sending: 'Belgium',      receiving: 'Algeria',       cost: 10.08, region: 'Europe→Africa' },
  { sending: 'Belgium',      receiving: 'Congo, DRC',    cost: 8.87,  region: 'Europe→Africa' },
  { sending: 'Belgium',      receiving: 'Morocco',       cost: 5.24,  region: 'Europe→Africa' },
  { sending: 'Bahrain',      receiving: 'Egypt',         cost: 4.07,  region: 'MENA' },
  { sending: 'France',       receiving: 'Algeria',       cost: 10.95, region: 'Europe→Africa' },
  { sending: 'UK',           receiving: 'Nigeria',       cost: 5.20,  region: 'Europe→Africa' },
  { sending: 'USA',          receiving: 'Nigeria',       cost: 4.80,  region: 'Americas→Africa' },
  { sending: 'USA',          receiving: 'Kenya',         cost: 3.90,  region: 'Americas→Africa' },
  { sending: 'USA',          receiving: 'Ghana',         cost: 4.20,  region: 'Americas→Africa' },
  { sending: 'UAE',          receiving: 'Somalia',       cost: 11.20, region: 'MENA→Africa' },
  { sending: 'UAE',          receiving: 'Ethiopia',      cost: 7.80,  region: 'MENA→Africa' },
  { sending: 'China',        receiving: 'Nigeria',       cost: 6.50,  region: 'Asia→Africa' },
  { sending: 'India',        receiving: 'Kenya',         cost: 4.50,  region: 'Asia→Africa' },
]

export interface CorridorRow {
  sending: string
  receiving: string
  cost: number
  region: string
}

// ---- MARKET DATA (Real: World Bank WDI 2023) ----
// Remittances received (USD billions) + % of GDP for key African countries
export const MARKET_DATA: MarketRow[] = [
  { country: 'Nigeria',      received_bn: 19.5,  gdp_pct: 3.8,  paid_bn: 0.8,  region: 'West Africa',     wise_present: false },
  { country: 'Egypt',        received_bn: 22.0,  gdp_pct: 5.5,  paid_bn: 2.1,  region: 'North Africa',    wise_present: false },
  { country: 'Morocco',      received_bn: 10.5,  gdp_pct: 8.2,  paid_bn: 0.4,  region: 'North Africa',    wise_present: false },
  { country: 'Kenya',        received_bn: 4.2,   gdp_pct: 3.1,  paid_bn: 0.3,  region: 'East Africa',     wise_present: false },
  { country: 'Ghana',        received_bn: 4.7,   gdp_pct: 5.8,  paid_bn: 0.2,  region: 'West Africa',     wise_present: false },
  { country: 'Ethiopia',     received_bn: 5.2,   gdp_pct: 3.6,  paid_bn: 0.1,  region: 'East Africa',     wise_present: false },
  { country: 'Tanzania',     received_bn: 0.7,   gdp_pct: 0.9,  paid_bn: 0.5,  region: 'East Africa',     wise_present: false },
  { country: 'Zimbabwe',     received_bn: 2.0,   gdp_pct: 14.1, paid_bn: 0.1,  region: 'Southern Africa', wise_present: false },
  { country: 'Mozambique',   received_bn: 0.4,   gdp_pct: 2.8,  paid_bn: 0.1,  region: 'Southern Africa', wise_present: false },
  { country: 'Senegal',      received_bn: 2.7,   gdp_pct: 9.4,  paid_bn: 0.1,  region: 'West Africa',     wise_present: false },
  { country: 'South Africa', received_bn: 0.9,   gdp_pct: 0.2,  paid_bn: 2.8,  region: 'Southern Africa', wise_present: false },
  { country: 'Uganda',       received_bn: 1.2,   gdp_pct: 2.8,  paid_bn: 0.1,  region: 'East Africa',     wise_present: false },
  { country: 'Angola',       received_bn: 0.2,   gdp_pct: 0.3,  paid_bn: 0.5,  region: 'Southern Africa', wise_present: false },
  { country: 'Somalia',      received_bn: 1.4,   gdp_pct: 20.0, paid_bn: 0.0,  region: 'East Africa',     wise_present: false },
  { country: 'Algeria',      received_bn: 2.5,   gdp_pct: 0.8,  paid_bn: 0.5,  region: 'North Africa',    wise_present: false },
]

export interface MarketRow {
  country: string
  received_bn: number
  gdp_pct: number
  paid_bn: number
  region: string
  wise_present: boolean
}

// Compute Market Inefficiency Score = cost × volume_bn × gdp_pct
// We need to join corridor costs with market data
export function computeMarketScore(markets: MarketRow[], corridors: CorridorRow[]) {
  return markets.map(m => {
    const relatedCorridors = corridors.filter(c => c.receiving === m.country)
    const avgCost = relatedCorridors.length > 0
      ? relatedCorridors.reduce((s, c) => s + c.cost, 0) / relatedCorridors.length
      : 5.5 // global avg fallback
    const score = avgCost * m.received_bn * m.gdp_pct
    return { ...m, avgCost, score: Math.round(score * 10) / 10 }
  }).sort((a, b) => b.score - a.score)
}

// ---- OPERATING LEVERAGE (estimated from Wise cost structure) ----
export const OPERATING_LEVERAGE = [
  { volume_bn: 10,  cost_per_txn: 3.20, year: 2019 },
  { volume_bn: 22,  cost_per_txn: 2.10, year: 2020 },
  { volume_bn: 54,  cost_per_txn: 1.40, year: 2021 },
  { volume_bn: 76,  cost_per_txn: 1.15, year: 2022 },
  { volume_bn: 104, cost_per_txn: 0.95, year: 2023 },
  { volume_bn: 118, cost_per_txn: 0.87, year: 2024 },
  { volume_bn: 145, cost_per_txn: 0.76, year: 2025 },
  // Projected with Africa expansion
  { volume_bn: 175, cost_per_txn: 0.67, year: 2026, projected: true },
  { volume_bn: 210, cost_per_txn: 0.58, year: 2027, projected: true },
  { volume_bn: 255, cost_per_txn: 0.50, year: 2028, projected: true },
]

// ---- STRATEGY PHASES ----
export const STRATEGY_PHASES = [
  {
    id: 'phase1', name: 'Phase 1: Partnerships',
    period: '2025–2026', status: 'active',
    volumePct: 15, operationalControl: 20,
    description: 'License local MTOs, co-brand, use Wise rails for FX. Zero capex. Fast market entry.',
    metrics: [
      { label: 'Corridors Targeted', value: '8–12', trend: 'up' },
      { label: 'Market Capture', value: '0.5%–1%', trend: 'up' },
      { label: 'Unit Economics', value: 'Partner margin drag ~0.15%', trend: 'neutral' },
    ],
    risks: ['Regulatory dependency on partner', 'Brand dilution', 'Data opacity'],
    earlySignals: ['Partner volume +20% MoM', 'NPS > 55 in new corridors'],
  },
  {
    id: 'phase2', name: 'Phase 2: Integration',
    period: '2027–2028', status: 'upcoming',
    volumePct: 35, operationalControl: 60,
    description: 'API-first model. Wise becomes middleware. Local settlements via agent network.',
    metrics: [
      { label: 'API Partners', value: '25+', trend: 'up' },
      { label: 'Market Capture', value: '2%–4%', trend: 'up' },
      { label: 'Margin Improvement', value: '+0.08–0.12%', trend: 'up' },
    ],
    risks: ['AML/KYC compliance', 'FX volatility in frontier markets', 'Tech debt'],
    earlySignals: ['API call volume 2x QoQ', 'Chargeback rate < 0.3%'],
  },
  {
    id: 'phase3', name: 'Phase 3: Own Infrastructure',
    period: '2029+', status: 'future',
    volumePct: 50, operationalControl: 90,
    description: 'Wise holds local licenses. Direct central bank relationships. Own float pool.',
    metrics: [
      { label: 'Markets Licensed', value: '15+', trend: 'up' },
      { label: 'Market Capture', value: '5%–8%', trend: 'up' },
      { label: 'Full Fee Capture', value: '0.55–0.65%', trend: 'up' },
    ],
    risks: ['Capital requirements', 'Political risk', 'Currency controls'],
    earlySignals: ['License approval rate > 70%', 'Float yield > 4%'],
  },
]

// ---- RISK INDICATORS ----
export const RISKS = [
  { category: 'Regulatory', risk: 'Licensing delays in new markets', severity: 'high', probability: 'medium', proxy: 'World Bank Ease of Doing Business rank < 100', mitigation: 'Phase 1 partnership model bypasses direct licensing' },
  { category: 'Regulatory', risk: 'FX controls / repatriation restrictions', severity: 'high', probability: 'medium', proxy: 'Current account restriction index > 0.5', mitigation: 'Netting model; hold local float' },
  { category: 'AML/Fraud', risk: 'Elevated fraud rate in cash-heavy corridors', severity: 'high', probability: 'high', proxy: 'Cash penetration > 60%; transaction monitoring ratio', mitigation: 'Enhanced KYC; velocity limits in Phase 1' },
  { category: 'AML/Fraud', risk: 'Sanctions exposure (Somalia, DRC)', severity: 'critical', probability: 'low', proxy: 'OFAC sanctions list coverage; country risk score', mitigation: 'Exclude sanctioned corridors; real-time screening' },
  { category: 'Operational', risk: 'FX volatility eroding unit margins', severity: 'medium', probability: 'high', proxy: 'Corridor FX vol > 15% annualised', mitigation: 'Dynamic pricing buffer; FX hedging program' },
  { category: 'Operational', risk: 'Partner MTO default / exit', severity: 'medium', probability: 'medium', proxy: 'Partner concentration > 30% of corridor volume', mitigation: 'Multi-partner model; no single partner > 25%' },
  { category: 'Strategic', risk: 'Interest income decline offsets Africa gains', severity: 'high', probability: 'medium', proxy: 'Central bank rate cuts; interest income < 30% of total', mitigation: 'Africa expansion accelerates fee mix rebalancing' },
  { category: 'Strategic', risk: 'Local competitors entrench before Wise', severity: 'medium', probability: 'medium', proxy: 'MoMo penetration growth > 25% YoY', mitigation: 'Differentiate on price transparency + speed' },
]

// ---- EARLY / FAILURE SIGNALS ----
export const SIGNALS = {
  early: [
    { signal: 'Corridor volume activation rate', threshold: '> 3 new corridors live per quarter', category: 'Growth' },
    { signal: 'Cost-per-transaction in new corridors', threshold: 'Declining QoQ (economies of scale)', category: 'Efficiency' },
    { signal: 'Africa fee revenue as % of total', threshold: 'Reaches 3% within 18 months', category: 'Revenue Mix' },
    { signal: 'Transaction fee revenue growth rate', threshold: '> 25% YoY (outpacing interest income)', category: 'Revenue Mix' },
    { signal: 'Customer acquisition cost in Africa', threshold: 'CAC < $15 via partnerships', category: 'Unit Economics' },
    { signal: 'NPS in new corridors', threshold: '> 50 (vs. 72 global average)', category: 'Product' },
    { signal: 'Partner uptime / SLA', threshold: '> 99.2% corridor availability', category: 'Operations' },
  ],
  failure: [
    { signal: 'Fraud rate in Africa corridors', threshold: '> 0.8% of transaction value', category: 'AML/Fraud' },
    { signal: 'Regulatory approval timeline', threshold: '> 18 months for first licence', category: 'Regulatory' },
    { signal: 'Margin per Africa transaction', threshold: 'Negative contribution margin at 12mo', category: 'Financials' },
    { signal: 'Interest income dependency', threshold: 'Interest income > 45% of total (worsening)', category: 'Revenue Mix' },
    { signal: 'Partner corridor churn', threshold: '> 2 partners exiting in 6 months', category: 'Operations' },
    { signal: 'Volume growth in Africa', threshold: '< 15% QoQ (Phase 1 expected > 30%)', category: 'Growth' },
    { signal: 'Competitor price matching', threshold: 'Incumbent drops to < 3% in target corridors', category: 'Competition' },
  ],
}
