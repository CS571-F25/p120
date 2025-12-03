import { Card, Alert } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CURRENCY_SYMBOLS, STATIC_EXCHANGE_RATES } from '../../utils/calculators/regionalData';

const CostBarChart = ({ scenarios }) => {
  if (!scenarios || scenarios.length === 0) return null;

  // Check what currencies are being used
  const currencies = [...new Set(scenarios.map(s => s.currency || 'USD'))];
  const hasMultipleCurrencies = currencies.length > 1;
  const allSameCurrency = currencies.length === 1;
  const displayCurrency = allSameCurrency ? currencies[0] : 'USD';
  const currencySymbol = CURRENCY_SYMBOLS[displayCurrency] || '$';

  // Convert costs to display currency
  const convertToDisplayCurrency = (cost, fromCurrency) => {
    if (fromCurrency === displayCurrency) return cost;

    // Convert from original currency to USD first, then to display currency
    const fromRate = STATIC_EXCHANGE_RATES[fromCurrency] || 1;
    const toRate = STATIC_EXCHANGE_RATES[displayCurrency] || 1;

    // Cost is stored in fromCurrency, convert to USD first then to target
    const costInUSD = cost / fromRate;
    return costInUSD * toRate;
  };

  // Truncate scenario name to max 20 characters
  const truncateName = (name) => {
    if (!name) return 'Unnamed';
    return name.length > 20 ? name.substring(0, 20) + '...' : name;
  };

  // Prepare data for bar chart
  const data = scenarios.map(scenario => {
    const originalCurrency = scenario.currency || 'USD';
    const convertedCost = hasMultipleCurrencies
      ? convertToDisplayCurrency(scenario.totalCost, originalCurrency)
      : scenario.totalCost;

    return {
      name: truncateName(scenario.name),
      fullName: scenario.name || 'Unnamed',
      cost: convertedCost,
      region: scenario.params?.region || 'Unknown',
      originalCurrency: originalCurrency,
      wasConverted: hasMultipleCurrencies && originalCurrency !== 'USD'
    };
  });

  const formatCurrency = (value) => {
    return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
  };

  // Get list of converted currencies for the note
  const convertedCurrencies = hasMultipleCurrencies
    ? currencies.filter(c => c !== 'USD').join(', ')
    : null;

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-warning text-dark">
        <p className="h5 mb-0">Scenario Comparison</p>
        {hasMultipleCurrencies && (
          <small className="text-muted">All values converted to USD for comparison</small>
        )}
        {allSameCurrency && displayCurrency !== 'USD' && (
          <small className="text-muted">All values displayed in {displayCurrency}</small>
        )}
      </Card.Header>
      <Card.Body>
        {hasMultipleCurrencies && (
          <Alert variant="info" className="py-2 mb-3">
            <small>
              <strong>Note:</strong> Scenarios with {convertedCurrencies} currencies have been converted to USD using current exchange rates for comparison purposes.
            </small>
          </Alert>
        )}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} role="img" aria-label="Bar chart comparing costs across saved drilling scenarios">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value, name, props) => {
                const formattedValue = formatCurrency(value);
                if (props.payload.wasConverted) {
                  return [formattedValue + ' (converted)', 'Total Cost'];
                }
                return [formattedValue, 'Total Cost'];
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fullName;
                }
                return label;
              }}
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Bar dataKey="cost" fill="#1e3a8a" name={`Total Cost (${displayCurrency})`} />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default CostBarChart;
