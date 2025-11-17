import { REGIONAL_MULTIPLIERS, GLOBAL_RIG_RATES, STATIC_EXCHANGE_RATES } from './regionalData';

class GlobalDrillingCalculator {
  constructor() {
    this.currencyRates = STATIC_EXCHANGE_RATES;
  }

  async loadCurrencyRates() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.ok) {
        const data = await response.json();
        this.currencyRates = data.rates;
      }
    } catch (error) {
      console.warn('Using static currency rates');
    }
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
    const baseCost = this.calculateBaseCost(depth, location, rigType, drillingDays, region);

    // Apply regional multiplier
    const regionalMultiplier = this.getRegionalMultiplier(region, country);
    const adjustedCost = baseCost * regionalMultiplier;

    // Currency conversion
    const finalCost = this.convertCurrency(adjustedCost, currency);

    // Generate detailed breakdown
    const breakdown = this.generateBreakdown(params, regionalMultiplier);

    return {
      baseCost,
      regionalMultiplier,
      adjustedCost,
      finalCost,
      currency,
      breakdown,
      totalCost: finalCost
    };
  }

  calculateBaseCost(depth, location, rigType, drillingDays, region) {
    // SPE methodology implementation
    const fixedCosts = location === 'offshore' ? 2000000 : 500000;
    const depthCost = depth * (location === 'offshore' ? 400 : 150);
    const rigRate = this.getRigRate(region, location, rigType);
    const timeCost = rigRate * drillingDays;

    return fixedCosts + depthCost + timeCost;
  }

  getRegionalMultiplier(region, country) {
    return REGIONAL_MULTIPLIERS[region]?.[country] || 1.0;
  }

  getRigRate(region, location, rigType) {
    // Get rig rate based on region, location, and rig type
    const regionRates = GLOBAL_RIG_RATES[region] || GLOBAL_RIG_RATES.USA;
    const locationRates = regionRates[location];

    if (!locationRates) {
      // Fallback to USA rates if region doesn't have this location type
      return GLOBAL_RIG_RATES.USA[location]?.[rigType] || 25000;
    }

    return locationRates[rigType] || locationRates.standard || 25000;
  }

  convertCurrency(amountUSD, targetCurrency) {
    const rate = this.currencyRates[targetCurrency] || 1.0;
    return amountUSD * rate;
  }

  generateBreakdown(params, regionalMultiplier) {
    const { depth, location, rigType, drillingDays, region } = params;

    const fixedCosts = location === 'offshore' ? 2000000 : 500000;
    const depthCost = depth * (location === 'offshore' ? 400 : 150);
    const rigRate = this.getRigRate(region, location, rigType);
    const timeCost = rigRate * drillingDays;

    return [
      {
        name: 'Fixed Costs (Permits, Site Prep)',
        baseCost: fixedCosts,
        multiplier: regionalMultiplier,
        finalCost: fixedCosts * regionalMultiplier,
        percentage: (fixedCosts / (fixedCosts + depthCost + timeCost)) * 100
      },
      {
        name: 'Depth-Related Costs',
        baseCost: depthCost,
        multiplier: regionalMultiplier,
        finalCost: depthCost * regionalMultiplier,
        percentage: (depthCost / (fixedCosts + depthCost + timeCost)) * 100
      },
      {
        name: `Rig Costs (${drillingDays} days @ $${rigRate.toLocaleString()}/day)`,
        baseCost: timeCost,
        multiplier: regionalMultiplier,
        finalCost: timeCost * regionalMultiplier,
        percentage: (timeCost / (fixedCosts + depthCost + timeCost)) * 100
      }
    ];
  }

  formatCurrency(amount, currency) {
    const symbols = {
      USD: '$',
      GBP: '£',
      EUR: '€',
      SAR: '﷼',
      AUD: 'A$',
      BRL: 'R$',
      NOK: 'kr'
    };

    const symbol = symbols[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  }
}

export default GlobalDrillingCalculator;
