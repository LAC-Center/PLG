from flask import Flask, request
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio

app = Flask(__name__)

# --- MOCK DATA ENGINE ---

def get_market_data():
    return pd.DataFrame({
        'Corridor': ['UK-Nigeria', 'UAE-India', 'USA-Mexico', 'France-Senegal', 'Germany-Ghana', 'South Africa-Zimbabwe', 'Spain-Colombia', 'UK-Pakistan'],
        'Volume_BN': [8.2, 18.5, 25.1, 3.4, 2.8, 4.1, 5.5, 6.7],
        'Avg_Cost_Pct': [7.8, 3.2, 4.1, 9.2, 8.5, 12.1, 5.4, 6.1],
        'Remit_GDP_Pct': [10.2, 3.1, 4.0, 14.2, 6.5, 8.2, 1.8, 9.5]
    })


def build_scatter(df):
    fig = px.scatter(
        df,
        x='Avg_Cost_Pct',
        y='Volume_BN',
        size='Remit_GDP_Pct',
        color='MIS_Score',
        hover_name='Corridor',
        text='Corridor',
        color_continuous_scale='Viridis',
        labels={'Avg_Cost_Pct': 'Corridor Cost (%)', 'Volume_BN': 'Volume (USD Billion)'}
    )
    fig.update_traces(textposition='top center')
    fig.update_layout(title_text='Market Opportunity Matrix', title_x=0.5)
    return pio.to_html(fig, full_html=False, include_plotlyjs='cdn')


def build_line_chart():
    vols = np.linspace(1, 100, 50)
    costs = (40 / (vols**0.5)) + 0.05
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=vols, y=costs, mode='lines', line=dict(color='#00b9ff', width=3)))
    fig.update_layout(
        xaxis_title='Volume Scaled',
        yaxis_title='Unit Transaction Cost (USD)',
        title='Infrastructure Flywheel: Escalado y Costes',
        title_x=0.5
    )
    return pio.to_html(fig, full_html=False, include_plotlyjs=False)


def build_pie_chart(estimated_rev, interest_rate):
    interest_map = {'Low (1%)': 100, 'Mid (3%)': 300, 'High (5%)': 600}
    labels = ['Transaction Fees (Stable)', 'Interest Income (Volatile)']
    values = [estimated_rev + 500, interest_map[interest_rate]]
    fig = px.pie(names=labels, values=values, hole=0.5, color_discrete_sequence=['#00b9ff', '#2e3338'])
    fig.update_layout(title='Mix de Revenue: Fees vs Interest Income', title_x=0.5)
    return pio.to_html(fig, full_html=False, include_plotlyjs=False)


@app.route('/')
def index():
    df = get_market_data()
    df['MIS_Score'] = (df['Avg_Cost_Pct'] * df['Volume_BN'] * df['Remit_GDP_Pct']) / 10

    mkt_share = float(request.args.get('market_capture', 2.5)) / 100
    wise_fee = float(request.args.get('wise_fee', 0.65)) / 100
    interest_rate = request.args.get('interest_rate', 'High (5%)')

    total_mkt_vol = df['Volume_BN'].sum()
    captured_vol = total_mkt_vol * mkt_share
    estimated_rev = captured_vol * 1000 * wise_fee
    avg_mis = df['MIS_Score'].mean()

    scatter_html = build_scatter(df)
    line_html = build_line_chart()
    pie_html = build_pie_chart(estimated_rev, interest_rate)

    ranking_rows = ''.join(
        f"<tr><td>{row.Corridor}</td><td>{row.MIS_Score:.1f}</td></tr>"
        for row in df.sort_values(by='MIS_Score', ascending=False)[['Corridor', 'MIS_Score']].itertuples()
    )

    return f"""
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Wise Strategic Analysis | High-Cost Corridors</title>
    <style>
        body {{ margin: 0; font-family: Inter, system-ui, sans-serif; background: #f5f7f9; color: #111827; }}
        .page {{ max-width: 1400px; margin: 0 auto; padding: 24px; }}
        header {{ display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; }}
        .hero {{ padding: 24px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08); }}
        h1 {{ margin: 0; font-size: 2.4rem; }}
        h2 {{ margin-top: 0; }}
        .cards {{ display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 24px; }}
        .card {{ background: #ffffff; padding: 20px; border-radius: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06); }}
        .card strong {{ display: block; font-size: 0.95rem; color: #6b7280; margin-bottom: 8px; }}
        .card span {{ font-size: 1.8rem; font-weight: 700; }}
        .dashboard {{ display: grid; grid-template-columns: 3fr 2fr; gap: 20px; margin-top: 28px; }}
        .chart-card {{ background: #ffffff; padding: 20px; border-radius: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06); }}
        .form-panel {{ background: #ffffff; padding: 20px; border-radius: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06); margin-top: 20px; }}
        .form-item {{ margin-bottom: 16px; }}
        label {{ display: block; font-size: 0.95rem; margin-bottom: 6px; color: #374151; }}
        input, select {{ width: 100%; padding: 12px 14px; border: 1px solid #d1d5db; border-radius: 12px; font-size: 1rem; }}
        button {{ background: #2563eb; color: white; border: none; border-radius: 12px; padding: 12px 18px; font-size: 1rem; cursor: pointer; }}
        button:hover {{ background: #1d4ed8; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 12px; }}
        th, td {{ text-align: left; padding: 12px; border-bottom: 1px solid #e5e7eb; }}
        th {{ color: #111827; }}
        .footer {{ margin-top: 20px; font-size: 0.95rem; color: #6b7280; }}
        @media (max-width: 960px) {{ .dashboard {{ grid-template-columns: 1fr; }} .cards {{ grid-template-columns: 1fr; }} }}
    </style>
</head>
<body>
    <div class='page'>
        <header class='hero'>
            <div>
                <h1>Wise Strategic Analysis</h1>
                <p>Producto PLG + Operating Leverage para corredores de alto coste. Evaluación estratégica del potencial de Wise en mercados ineficientes.</p>
            </div>
            <div style='text-align:right;'>
                <img src='https://wise.com/public-resources/assets/logos/wise/brand_logo_inverse.svg' alt='Wise' width='140'>
            </div>
        </header>

        <section class='cards'>
            <div class='card'><strong>Total Corridor Volume</strong><span>${total_mkt_vol:.1f}BN</span></div>
            <div class='card'><strong>Target Capture Vol</strong><span>${captured_vol:.2f}BN</span></div>
            <div class='card'><strong>Est. Annual Revenue</strong><span>${estimated_rev:.1f}M</span></div>
            <div class='card'><strong>MIS Avg Score</strong><span>{avg_mis:.1f} pts</span></div>
        </section>

        <section class='dashboard'>
            <div class='chart-card'>
                <h2>Market Inefficiency Matrix</h2>
                {scatter_html}
            </div>
            <div class='chart-card'>
                <h2>Expansion Priority Ranking</h2>
                <table>
                    <thead><tr><th>Corridor</th><th>MIS Score</th></tr></thead>
                    <tbody>{ranking_rows}</tbody>
                </table>
                <div class='form-panel'>
                    <h3>Simulador</h3>
                    <form method='get'>
                        <div class='form-item'><label>Market Capture (%)</label><input type='number' step='0.1' min='0.1' max='20' name='market_capture' value='{mkt_share*100:.1f}'></div>
                        <div class='form-item'><label>Wise Target Fee (%)</label><input type='number' step='0.01' min='0.1' max='5' name='wise_fee' value='{wise_fee*100:.2f}'></div>
                        <div class='form-item'><label>Macro Interest Rates</label>
                            <select name='interest_rate'>
                                <option value='Low (1%)' {'selected' if interest_rate == 'Low (1%)' else ''}>Low (1%)</option>
                                <option value='Mid (3%)' {'selected' if interest_rate == 'Mid (3%)' else ''}>Mid (3%)</option>
                                <option value='High (5%)' {'selected' if interest_rate == 'High (5%)' else ''}>High (5%)</option>
                            </select>
                        </div>
                        <button type='submit'>Actualizar</button>
                    </form>
                </div>
            </div>
        </section>

        <section class='dashboard'>
            <div class='chart-card'>
                <h2>Operational Leverage (Cost vs Vol)</h2>
                {line_html}
            </div>
            <div class='chart-card'>
                <h2>Revenue Resilience Mix</h2>
                {pie_html}
            </div>
        </section>

        <div class='footer'>Wise Strategic Tool - Nivel Consultoría Estratégica. Los datos son proxies basados en reportes del World Bank 2024.</div>
    </div>
</body>
</html>
"""


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
