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
  },

  latinAmerica: {
    onshore: {
      standard: 22000,
      premium: 32000
    },
    offshore: {
      jackup: 70000,
      semisubmersible: 260000,
      drillship: 420000
    }
  }
};

// Currency symbols for display
export const CURRENCY_SYMBOLS = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  SAR: '﷼',
  AUD: 'A$',
  BRL: 'R$',
  NOK: 'kr'
};

// Static exchange rates as fallback
export const STATIC_EXCHANGE_RATES = {
  USD: 1.0,
  GBP: 0.79,
  EUR: 0.92,
  SAR: 3.75,
  AUD: 1.53,
  BRL: 5.67,
  NOK: 10.85
};

// Free API for currency conversion (1500 requests/month free)
export const getCurrencyRates = async () => {
  try {
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.warn('Using static exchange rates as fallback:', error);
    return STATIC_EXCHANGE_RATES;
  }
};

// Format region/country names for display
export const formatRegionName = (region) => {
  const names = {
    USA: 'United States',
    middleEast: 'Middle East',
    northSea: 'North Sea',
    asiaPacific: 'Asia-Pacific',
    latinAmerica: 'Latin America'
  };
  return names[region] || region;
};

export const formatCountryName = (country) => {
  const names = {
    permianBasin: 'Permian Basin',
    eagleFord: 'Eagle Ford',
    bakken: 'Bakken',
    gulfOfMexico: 'Gulf of Mexico',
    alaska: 'Alaska',
    saudiArabia: 'Saudi Arabia',
    uae: 'UAE',
    kuwait: 'Kuwait',
    iraq: 'Iraq',
    ukSector: 'UK Sector',
    norwegianSector: 'Norwegian Sector',
    danish: 'Danish Sector',
    australia: 'Australia',
    malaysia: 'Malaysia',
    indonesia: 'Indonesia',
    china: 'China',
    brazilPreSalt: 'Brazil Pre-Salt',
    brazilOnshore: 'Brazil Onshore',
    mexico: 'Mexico',
    argentina: 'Argentina'
  };
  return names[country] || country;
};
