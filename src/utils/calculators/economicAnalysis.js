// economicAnalysis.js - Economic analysis calculations for drilling projects

export class EconomicAnalyzer {
  constructor() {
    // Default oil price (can be updated with API data)
    this.defaultOilPrice = 75; // $/barrel
  }

  async fetchOilPrice() {
    // Try to fetch current WTI oil price (free API with static fallback)
    try {
      // Note: This is a placeholder - actual EIA API requires key
      // Using static fallback for now
      return this.defaultOilPrice;
    } catch (error) {
      console.warn('Using default oil price');
      return this.defaultOilPrice;
    }
  }

  calculateEconomics(drillingCost, wellParams) {
    const {
      depth,
      oilPrice = this.defaultOilPrice,
      region = 'USA',
      location = 'onshore',
      wellType = 'conventional'
    } = wellParams;

    // Production estimates by region/type (barrels per foot of depth)
    const productionRates = {
      conventional: {
        USA: 12,
        middleEast: 18,
        northSea: 15,
        asiaPacific: 14,
        latinAmerica: 13
      },
      unconventional: {
        USA: 20,
        middleEast: 8,
        northSea: 10,
        asiaPacific: 12,
        latinAmerica: 15
      },
      offshore: {
        USA: 25,
        middleEast: 30,
        northSea: 22,
        asiaPacific: 26,
        latinAmerica: 28
      }
    };

    // Determine well type based on location
    const effectiveWellType = location === 'offshore' ? 'offshore' : wellType;

    // EUR (Estimated Ultimate Recovery) in barrels/foot
    const eurPerFoot = productionRates[effectiveWellType]?.[region] || 15;
    const totalProduction = depth * eurPerFoot;

    // Economic calculations
    const results = {
      // 1. Break-Even Analysis
      breakEvenPrice: this.calculateBreakEven(drillingCost, totalProduction),

      // 2. NPV Calculation (3-year production profile)
      npv: this.calculateNPV(drillingCost, totalProduction, oilPrice),

      // 3. ROI Calculation
      roi: this.calculateROI(drillingCost, totalProduction, oilPrice),

      // 4. Payback Period
      paybackMonths: this.calculatePayback(drillingCost, totalProduction, oilPrice),

      // 5. Sensitivity Analysis
      sensitivity: this.priceSensitivity(drillingCost, totalProduction),

      // Additional metrics
      totalProduction,
      eurPerFoot,
      currentOilPrice: oilPrice
    };

    return results;
  }

  calculateBreakEven(capex, production) {
    const royalty = 0.125; // 12.5% royalty
    const opex = 15; // $15/barrel operating cost

    // Break-even = (CAPEX + Total OPEX) / Total Production
    const totalOpex = production * opex;
    const totalCost = capex + totalOpex;
    const netProduction = production * (1 - royalty);

    return totalCost / netProduction;
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

    // Assume production over 36 months
    const monthlyProduction = production / 36;
    const monthlyRevenue = monthlyProduction * netRevenuePerBarrel;

    if (monthlyRevenue <= 0) {
      return Infinity;
    }

    return capex / monthlyRevenue;
  }

  priceSensitivity(capex, production) {
    const pricePoints = [30, 40, 50, 60, 70, 80, 90, 100];
    return pricePoints.map(price => ({
      oilPrice: price,
      npv: this.calculateNPV(capex, production, price),
      roi: this.calculateROI(capex, production, price),
      profitable: this.calculateNPV(capex, production, price) > 0
    }));
  }

  getInvestmentRecommendation(npv, drillingCost, roi) {
    if (npv > drillingCost * 0.5) {
      return {
        type: 'strong',
        title: 'Strong Investment Opportunity',
        message: 'NPV exceeds 50% of initial cost. Highly recommended.',
        icon: '✓'
      };
    } else if (npv > 0 && roi > 15) {
      return {
        type: 'moderate',
        title: 'Moderate Investment Opportunity',
        message: 'Positive returns expected. Consider risk factors and alternatives.',
        icon: '⚠'
      };
    } else if (npv > 0) {
      return {
        type: 'marginal',
        title: 'Marginal Investment',
        message: 'Minimal positive returns. High sensitivity to oil price changes.',
        icon: '⚠'
      };
    } else {
      return {
        type: 'not-recommended',
        title: 'Not Recommended',
        message: 'Negative returns at current oil prices. Wait for better market conditions.',
        icon: '✗'
      };
    }
  }
}

export default EconomicAnalyzer;
