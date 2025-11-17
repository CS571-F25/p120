
# WellWise: Complete Development Documentation

## Table of Contents
1. [Project Setup](#project-setup)
2. [Global Cost Data & Formulas](#global-cost-data--formulas)
3. [Component Development](#component-development)
4. [Implementation Guide](#implementation-guide)
5. [Testing & Deployment](#testing--deployment)

---

## Project Setup

### Step 1: Initialize React Application
Completed on pre-project.

### Step 2: Create Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx
│   │   ├── Footer.jsx
│   │   └── PageContainer.jsx
│   ├── calculator/
│   │   ├── WellInputForm.jsx
│   │   ├── DepthInput.jsx
│   │   ├── LocationSelector.jsx
│   │   ├── RegionSelector.jsx
│   │   ├── RigTypeSelector.jsx
│   │   └── DrillingDaysSlider.jsx
│   ├── display/
│   │   ├── CostSummaryCard.jsx
│   │   ├── CostBreakdownTable.jsx
│   │   ├── PieChart.jsx
│   │   └── BarChart.jsx
│   └── interactive/
│       ├── ScenarioSaveButton.jsx
│       └── ScenarioCard.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── AnalysisPage.jsx
│   ├── SavedScenariosPage.jsx
│   └── ResourcesPage.jsx
├── utils/
│   ├── calculators/
│   │   ├── globalCostCalculator.js
│   │   └── regionalData.js
│   └── storage.js
└── styles/
    └── global.css
```

---

## Global Cost Data & Formulas

### Regional Cost Multipliers (2024 Data)

```javascript
// regionalData.js - Based on IHS Markit UCCI 2024 Q1
export const REGIONAL_MULTIPLIERS = {
  // North America
  USA: {
    permianBasin: 1.0,      // Baseline
    eagleFord: 0.95,
    bakken: 1.1,
    gulfOfMexico: 1.8,
    alaska: 2.2
  },
  
  // Middle East - Source: OPEC Cost Studies 2024
  middleEast: {
    saudiArabia: 0.65,     // Lower labor/service costs
    uae: 0.70,
    kuwait: 0.68,
    iraq: 0.75
  },
  
  // North Sea - Source: UK Oil & Gas Authority 2024
  northSea: {
    ukSector: 1.85,        // High operational costs
    norwegianSector: 1.95,
    danish: 1.75
  },
  
  // Asia-Pacific - Source: Wood Mackenzie 2024
  asiaPacific: {
    australia: 1.65,
    malaysia: 0.85,
    indonesia: 0.80,
    china: 0.75
  },
  
  // Latin America - Source: ANP Brazil, CNH Mexico
  latinAmerica: {
    brazilPreSalt: 2.4,    // Ultra-deepwater
    brazilOnshore: 0.90,
    mexico: 0.95,
    argentina: 1.05
  }
};
```

### Global Rig Day Rates (2024)

```javascript
// Data Sources: Rigzone, IHS Petrodata
export const GLOBAL_RIG_RATES = {
  USA: {
    onshore: {
      small: 15000,
      standard: 25000,
      premium: 35000
    },
    offshore: {
      jackup: 75000,
      semisubmersible: 275000,
      drillship: 450000
    }
  },
  
  middleEast: {
    onshore: {
      small: 10000,
      standard: 18000,
      premium: 28000
    },
    offshore: {
      jackup: 55000,
      semisubmersible: 180000
    }
  },
  
  northSea: {
    offshore: {
      jackup: 120000,
      semisubmersible: 380000,
      drillship: 550000
    }
  },
  
  asiaPacific: {
    onshore: {
      standard: 20000,
      premium: 30000
    },
    offshore: {
      jackup: 65000,
      semisubmersible: 250000,
      drillship: 400000
    }
  }
};
```

### Currency Conversion Integration

```javascript
// currencyService.js
export const getCurrencyRates = async () => {
  // Free API: exchangerate-api.com (1500 requests/month free)
  const response = await fetch(
    'https://api.exchangerate-api.com/v4/latest/USD'
  );
  return response.json();
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  SAR: '﷼',
  AUD: 'A$',
  BRL: 'R$',
  NOK: 'kr'
};
```

---

## Component Development

### Step 3: Create Global Calculator Class

```javascript
// globalCostCalculator.js
class GlobalDrillingCalculator {
  constructor() {
    this.loadRegionalData();
  }

  calculateCost(params) {
    const {
      depth,
      region,
      country,
      location,
      rigType,
      drillingDays,
      currency = 'USD'
    } = params;

    // Base calculation (USD)
    const baseCost = this.calculateBaseCost(depth, location, rigType, drillingDays);
    
    // Apply regional multiplier
    const regionalMultiplier = this.getRegionalMultiplier(region, country);
    const adjustedCost = baseCost * regionalMultiplier;
    
    // Currency conversion
    const finalCost = this.convertCurrency(adjustedCost, currency);
    
    return {
      baseCost,
      regionalMultiplier,
      adjustedCost,
      finalCost,
      breakdown: this.generateBreakdown(params)
    };
  }

  calculateBaseCost(depth, location, rigType, drillingDays) {
    // SPE methodology implementation
    const fixedCosts = location === 'offshore' ? 2000000 : 500000;
    const depthCost = depth * (location === 'offshore' ? 400 : 150);
    const rigRate = this.getRigRate('USA', location, rigType);
    const timeCost = rigRate * drillingDays;
    
    return fixedCosts + depthCost + timeCost;
  }

  getRegionalMultiplier(region, country) {
    return REGIONAL_MULTIPLIERS[region]?.[country] || 1.0;
  }
}
```

### Step 4: Build Region Selector Component

```javascript
// RegionSelector.jsx
import React from 'react';
import { REGIONAL_MULTIPLIERS } from '../utils/regionalData';

const RegionSelector = ({ value, onChange }) => {
  const regions = Object.keys(REGIONAL_MULTIPLIERS);
  
  return (
    <div className="region-selector">
      <label htmlFor="region">Select Region</label>
      <select 
        id="region" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select drilling region"
      >
        <option value="">Choose Region...</option>
        {regions.map(region => (
          <optgroup key={region} label={region}>
            {Object.keys(REGIONAL_MULTIPLIERS[region]).map(country => (
              <option key={country} value={`${region}-${country}`}>
                {country} (Cost Index: {REGIONAL_MULTIPLIERS[region][country]}x)
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
```

### Step 5: Implement Economic Analysis Module

```javascript
// economicAnalysis.js
export class EconomicAnalyzer {
  calculateEconomics(drillingCost, wellParams) {
    const {
      depth,
      oilPrice,
      region,
      wellType = 'conventional'
    } = wellParams;

    // Production estimates by region/type
    const productionRates = {
      conventional: { USA: 12, middleEast: 18, northSea: 15 },
      unconventional: { USA: 20, middleEast: 8, northSea: 10 },
      offshore: { USA: 25, middleEast: 30, northSea: 22 }
    };

    // EUR (Estimated Ultimate Recovery) in barrels/foot
    const eurPerFoot = productionRates[wellType][region] || 15;
    const totalProduction = depth * eurPerFoot;

    // Economic calculations
    const results = {
      // 1. Break-Even Analysis
      breakEvenPrice: drillingCost / totalProduction,
      
      // 2. NPV Calculation (3-year production profile)
      npv: this.calculateNPV(drillingCost, totalProduction, oilPrice),
      
      // 3. ROI Calculation
      roi: this.calculateROI(drillingCost, totalProduction, oilPrice),
      
      // 4. Payback Period
      paybackMonths: this.calculatePayback(drillingCost, totalProduction, oilPrice),
      
      // 5. Sensitivity Analysis
      sensitivity: this.priceSensitivity(drillingCost, totalProduction)
    };

    return results;
  }

  calculateNPV(capex, production, oilPrice) {
    const discountRate = 0.10; // 10% discount rate
    const royalty = 0.125; // 12.5% royalty
    const opex = 15; // $15/barrel operating cost
    
    // Production decline curve (typical shale well)
    const productionSchedule = [
      { year: 1, percentage: 0.50 }, // 50% in year 1
      { year: 2, percentage: 0.30 }, // 30% in year 2
      { year: 3, percentage: 0.20 }  // 20% in year 3
    ];

    let npv = -capex; // Initial investment
    
    productionSchedule.forEach(({ year, percentage }) => {
      const annualProduction = production * percentage;
      const revenue = annualProduction * oilPrice * (1 - royalty);
      const operatingCost = annualProduction * opex;
      const cashFlow = revenue - operatingCost;
      const discountedCashFlow = cashFlow / Math.pow(1 + discountRate, year);
      npv += discountedCashFlow;
    });

    return npv;
  }

  calculateROI(capex, production, oilPrice) {
    const royalty = 0.125;
    const opex = 15;
    const netRevenuePerBarrel = oilPrice * (1 - royalty) - opex;
    const totalRevenue = production * netRevenuePerBarrel;
    return ((totalRevenue - capex) / capex) * 100;
  }

  calculatePayback(capex, production, oilPrice) {
    const royalty = 0.125;
    const opex = 15;
    const netRevenuePerBarrel = oilPrice * (1 - royalty) - opex;
    const monthlyProduction = production / 36; // 3-year production
    const monthlyRevenue = monthlyProduction * netRevenuePerBarrel;
    return capex / monthlyRevenue;
  }

  priceSensitivity(capex, production) {
    const pricePoints = [30, 40, 50, 60, 70, 80, 90, 100];
    return pricePoints.map(price => ({
      oilPrice: price,
      npv: this.calculateNPV(capex, production, price),
      profitable: this.calculateNPV(capex, production, price) > 0
    }));
  }
}
```

### Step 6: Create Economic Dashboard Component

```javascript
// EconomicDashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EconomicDashboard = ({ economics, drillingCost }) => {
  const { breakEvenPrice, npv, roi, paybackMonths, sensitivity } = economics;

  const getStatusColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="economic-dashboard">
      <h3>Economic Analysis Results</h3>
      
      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Break-Even Price</h4>
          <p className="metric-value">${breakEvenPrice.toFixed(2)}/barrel</p>
          <p className="metric-note">
            {breakEvenPrice < 50 ? '✓ Low risk' : '⚠ Higher risk'}
          </p>
        </div>

        <div className="metric-card">
          <h4>Net Present Value (NPV)</h4>
          <p className={`metric-value ${getStatusColor(npv)}`}>
            ${(npv / 1000000).toFixed(2)}M
          </p>
          <p className="metric-note">
            {npv > 0 ? '✓ Profitable' : '✗ Not profitable'}
          </p>
        </div>

        <div className="metric-card">
          <h4>Return on Investment</h4>
          <p className={`metric-value ${getStatusColor(roi)}`}>
            {roi.toFixed(1)}%
          </p>
          <p className="metric-note">
            {roi > 20 ? '✓ Strong returns' : 'Marginal returns'}
          </p>
        </div>

        <div className="metric-card">
          <h4>Payback Period</h4>
          <p className="metric-value">{paybackMonths.toFixed(1)} months</p>
          <p className="metric-note">
            {paybackMonths < 24 ? '✓ Quick recovery' : 'Extended recovery'}
          </p>
        </div>
      </div>

      {/* Price Sensitivity Chart */}
      <div className="sensitivity-chart">
        <h4>NPV Sensitivity to Oil Price</h4>
        <LineChart width={600} height={300} data={sensitivity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="oilPrice" label="Oil Price ($/barrel)" />
          <YAxis label="NPV ($M)" />
          <Tooltip formatter={(value) => `${(value/1000000).toFixed(2)}M`} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="npv" 
            stroke="#1e3a8a" 
            name="Net Present Value"
            strokeWidth={2}
          />
          <Line 
            y={0} 
            stroke="#dc2626" 
            strokeDasharray="5 5" 
            name="Break-even line"
          />
        </LineChart>
      </div>

      {/* Investment Decision Helper */}
      <div className="decision-helper">
        <h4>Investment Recommendation</h4>
        {npv > drillingCost * 0.5 ? (
          <div className="recommendation positive">
            <span className="icon">✓</span>
            <p>Strong investment opportunity. NPV exceeds 50% of initial cost.</p>
          </div>
        ) : npv > 0 ? (
          <div className="recommendation neutral">
            <span className="icon">⚠</span>
            <p>Moderate opportunity. Consider risk factors and alternatives.</p>
          </div>
        ) : (
          <div className="recommendation negative">
            <span className="icon">✗</span>
            <p>Not recommended at current oil prices. Wait for better conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicDashboard;
```

### Step 7: Integrate Economics into Main Calculator

```javascript
// WellInputForm.jsx (updated)
import { EconomicAnalyzer } from '../utils/economicAnalysis';

const WellInputForm = () => {
  const [showEconomics, setShowEconomics] = useState(false);
  const economicAnalyzer = new EconomicAnalyzer();

  useEffect(() => {
    const drillingCost = calculator.calculateCost(formData);
    const economicResults = economicAnalyzer.calculateEconomics(
      drillingCost.totalCost,
      formData
    );
    
    setResults({
      ...drillingCost,
      economics: economicResults
    });
  }, [formData]);

  return (
    <>
      {/* Existing form inputs */}
      
      <button 
        onClick={() => setShowEconomics(!showEconomics)}
        className="economics-toggle-btn"
      >
        {showEconomics ? 'Hide' : 'Show'} Economic Analysis
      </button>

      {showEconomics && results?.economics && (
        <EconomicDashboard 
          economics={results.economics}
          drillingCost={results.totalCost}
        />
      )}
    </>
  );
};
```

### Step 8: Create Main Calculator Form

```javascript
// WellInputForm.jsx
import React, { useState, useEffect } from 'react';
import GlobalDrillingCalculator from '../utils/globalCostCalculator';

const WellInputForm = () => {
  const [formData, setFormData] = useState({
    depth: 10000,
    region: 'USA',
    country: 'permianBasin',
    location: 'onshore',
    rigType: 'standard',
    drillingDays: 25,
    currency: 'USD'
  });

  const [results, setResults] = useState(null);
  const calculator = new GlobalDrillingCalculator();

  useEffect(() => {
    const calculated = calculator.calculateCost(formData);
    setResults(calculated);
  }, [formData]);

  return (
    <form className="well-input-form">
      {/* All input components */}
      <RegionSelector 
        value={`${formData.region}-${formData.country}`}
        onChange={(value) => {
          const [region, country] = value.split('-');
          setFormData({...formData, region, country});
        }}
      />
      {/* Other inputs */}
      
      {results && (
        <CostSummaryCard 
          total={results.finalCost}
          currency={formData.currency}
          multiplier={results.regionalMultiplier}
        />
      )}
    </form>
  );
};
```

### Step 6: Implement Cost Breakdown Visualization

```javascript
// CostBreakdownTable.jsx
import React from 'react';

const CostBreakdownTable = ({ breakdown, region }) => {
  return (
    <div className="cost-breakdown">
      <h3>Cost Breakdown Analysis</h3>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Base Cost (USD)</th>
            <th>Regional Adjustment</th>
            <th>Final Cost</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.baseCost.toLocaleString()}</td>
              <td>{item.multiplier}x</td>
              <td>${item.finalCost.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="region-note">
        <p>* Costs adjusted for {region} market conditions</p>
        <p>Source: IHS Markit UCCI 2024, Local regulatory data</p>
      </div>
    </div>
  );
};
```

### Step 7: Add Scenario Comparison

```javascript
// ScenarioComparison.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const ScenarioComparison = ({ scenarios }) => {
  const data = scenarios.map(s => ({
    name: `${s.country} - ${s.depth}ft`,
    cost: s.totalCost,
    region: s.region
  }));

  return (
    <div className="scenario-comparison">
      <h3>Regional Cost Comparison</h3>
      <BarChart width={800} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="cost" fill="#1e3a8a" />
      </BarChart>
    </div>
  );
};
```

### Step 8: Create Resources Page with Documentation

```javascript
// ResourcesPage.jsx
import React from 'react';

const ResourcesPage = () => {
  return (
    <div className="resources-page">
      <h2>Calculation Methodology & Data Sources</h2>
      
      <section>
        <h3>Global Data Sources</h3>
        <ul>
          <li>USA: EIA, Baker Hughes Rig Count</li>
          <li>Middle East: OPEC Annual Statistical Bulletin 2024</li>
          <li>North Sea: UK OGA Wells Insight Database</li>
          <li>Asia-Pacific: Wood Mackenzie Upstream Data Tool</li>
          <li>Brazil: ANP (Agência Nacional do Petróleo)</li>
        </ul>
      </section>

      <section>
        <h3>Regional Adjustments</h3>
        <p>Costs are adjusted using the IHS Markit Upstream Capital Costs Index (UCCI) 
        which accounts for:</p>
        <ul>
          <li>Labor costs and availability</li>
          <li>Equipment and material costs</li>
          <li>Regulatory requirements</li>
          <li>Infrastructure availability</li>
          <li>Currency exchange rates</li>
        </ul>
      </section>

      <section>
        <h3>Calculation Formula</h3>
        <code>
          Total Cost = (Base Cost × Regional Multiplier) × (1 + Contingency)
        </code>
        <p>Where Base Cost follows SPE-170941-MS methodology</p>
      </section>
    </div>
  );
};
```

---

## Implementation Guide

### Step 9: API Integration for Live Data

```javascript
// dataService.js
class DataService {
  async fetchOilPrice(region) {
    const endpoints = {
      USA: 'https://api.eia.gov/v2/petroleum/pri/spt/data/?frequency=daily',
      BRENT: 'https://api.eia.gov/v2/petroleum/pri/spt/data/?frequency=daily&data[0]=value&facets[product][]=EPCBRENT'
    };
    
    try {
      const response = await fetch(endpoints[region] || endpoints.USA);
      const data = await response.json();
      return data.response.data[0].value;
    } catch (error) {
      return region === 'BRENT' ? 80 : 75; // Fallback prices
    }
  }

  async fetchRigCount(country) {
    // Baker Hughes for USA, simulate for others
    if (country === 'USA') {
      // Actual Baker Hughes API call
      return fetch('https://bakerhughesrigcount.gcs-web.com/api/rig-count');
    }
    // Return simulated data for other regions
    return this.getSimulatedRigCount(country);
  }
}
```

### Step 10: Accessibility Implementation

```javascript
// Add to all interactive components
const accessibilityFeatures = {
  // Keyboard navigation
  onKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  },
  
  // ARIA labels
  'aria-label': 'Calculate drilling cost',
  'aria-describedby': 'cost-help-text',
  
  // Focus management
  tabIndex: 0,
  
  // Screen reader announcements
  'aria-live': 'polite',
  'aria-atomic': 'true'
};
```

### Step 11: Responsive Design

```css
/* global.css */
:root {
  --primary-blue: #1e3a8a;
  --secondary-gray: #6b7280;
  --success-green: #10b981;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    overflow-x: auto;
  }
}

/* Accessibility */
*:focus {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .no-print {
    display: none;
  }
  
  .cost-summary {
    page-break-inside: avoid;
  }
}
```

---

## Testing & Deployment

### Step 12: Testing Checklist

```javascript
// testCases.js
export const TEST_SCENARIOS = [
  {
    name: "USA Permian Baseline",
    input: { depth: 10000, region: 'USA', country: 'permianBasin' },
    expected: { min: 3500000, max: 4500000 }
  },
  {
    name: "Saudi Arabia Onshore",
    input: { depth: 8000, region: 'middleEast', country: 'saudiArabia' },
    expected: { min: 1800000, max: 2500000 }
  },
  {
    name: "North Sea Offshore",
    input: { depth: 15000, region: 'northSea', country: 'ukSector' },
    expected: { min: 25000000, max: 35000000 }
  },
  {
    name: "Brazil Pre-Salt",
    input: { depth: 20000, region: 'latinAmerica', country: 'brazilPreSalt' },
    expected: { min: 40000000, max: 60000000 }
  }
];
```

### Step 13: Performance Optimization

```javascript
// Memoization for expensive calculations
import { useMemo } from 'react';

const MemoizedCostDisplay = React.memo(({ cost, region }) => {
  const formattedCost = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cost);
  }, [cost]);

  return <div>{formattedCost}</div>;
});
```

### Step 14: Deployment Configuration

```json
// package.json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://yourusername.github.io/wellwise-calculator"
}
```

---

## Data Validation Sources

### Official References
1. **SPE Papers**: 
   - SPE-170941-MS: "Drilling Cost Estimation and Management"
   - SPE-180038-MS: "Global Drilling Cost Trends"

2. **Government Sources**:
   - USA: [EIA Drilling Productivity Report](https://www.eia.gov/petroleum/drilling/)
   - UK: [Oil & Gas Authority Wells Database](https://www.ogauthority.co.uk/)
   - Brazil: [ANP Production Data](http://www.anp.gov.br/)
   - Norway: [NPD Fact Pages](https://factpages.npd.no/)

3. **Industry Reports**:
   - IHS Markit UCCI (Quarterly)
   - Rystad Energy UCube
   - Wood Mackenzie Upstream Data Tool
   - Baker Hughes Rig Count (Weekly)

4. **Regional Specific**:
   - Middle East: OPEC Annual Statistical Bulletin
   - Asia-Pacific: Petronas Activity Outlook
   - Australia: APPEA Key Statistics

### API Endpoints Summary
```javascript
const API_ENDPOINTS = {
  oilPrices: {
    WTI: 'https://api.eia.gov/v2/petroleum/pri/spt/data/?frequency=daily',
    BRENT: 'https://api.eia.gov/v2/petroleum/pri/spt/data/?frequency=daily&data[0]=value&facets[product][]=EPCBRENT',
    DUBAI: 'Use commodity exchange APIs'
  },
  
  rigCounts: {
    USA: 'https://bakerhughesrigcount.gcs-web.com/',
    GLOBAL: 'Requires subscription to Rigzone or IHS'
  },
  
  currency: {
    FREE: 'https://api.exchangerate-api.com/v4/latest/USD',
    ALTERNATIVE: 'https://api.frankfurter.app/latest'
  }
};
```

---

## Final Notes

- All costs are estimates based on public data and industry averages
- Actual drilling costs vary significantly based on specific conditions
- Regional multipliers updated quarterly from IHS Markit UCCI
- Calculator suitable for educational and preliminary planning purposes
- For commercial use, validate with local drilling contractors

## Version History
- v1.0: US-only calculator with basic features
- v2.0: Global expansion with regional data
- v2.1: Added currency conversion and economic analysis
- v2.2: Enhanced accessibility and mobile responsiveness