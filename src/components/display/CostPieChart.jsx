import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CURRENCY_SYMBOLS, STATIC_EXCHANGE_RATES } from '../../utils/calculators/regionalData';

const CostPieChart = ({ results, compact = false }) => {
  if (!results || !results.breakdown) return null;

  const { breakdown, currency = 'USD' } = results;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const exchangeRate = STATIC_EXCHANGE_RATES[currency] || 1;

  // Prepare data for pie chart with currency conversion
  const data = breakdown.map(item => ({
    name: item.name.split('(')[0].trim(), // Shorten name for display
    value: item.finalCost * exchangeRate, // Convert to selected currency
    percentage: item.percentage
  }));

  // WCAG AA compliant colors - high contrast combinations
  // Using colors that provide 4.5:1 contrast ratio with white or dark text
  const COLORS = [
    { fill: '#1e40af', textColor: '#ffffff' }, // Deep blue - white text
    { fill: '#059669', textColor: '#ffffff' }, // Green - white text
    { fill: '#d97706', textColor: '#000000' }, // Amber - black text
  ];

  const formatCurrency = (value) => {
    return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
  };

  // Custom label renderer that places percentage inside pie slice with proper contrast
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    // Position label inside the slice (60% from center to edge)
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is >= 5% (to avoid cluttering small slices)
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length].textColor}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: compact ? '14px' : '16px',
          fontWeight: 'bold',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
        aria-label={`${(percent * 100).toFixed(0)} percent`}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const chartHeight = compact ? 250 : 400;
  const outerRadius = compact ? 80 : 120;

  const chartContent = (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
          aria-label="Cost distribution pie chart"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length].fill}
              aria-label={`${entry.name}: ${entry.percentage?.toFixed(1) || 0}%`}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={formatCurrency}
          contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
        />
        <Legend
          wrapperStyle={{ fontSize: compact ? '12px' : '14px' }}
          formatter={(value) => <span style={{ color: '#333' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  if (compact) {
    return chartContent;
  }

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">
        <h2 className="h5 mb-0">Cost Distribution</h2>
      </Card.Header>
      <Card.Body>
        {chartContent}
      </Card.Body>
    </Card>
  );
};

export default CostPieChart;
