import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CostBarChart = ({ scenarios }) => {
  if (!scenarios || scenarios.length === 0) return null;

  // Prepare data for bar chart
  const data = scenarios.map(scenario => ({
    name: `${scenario.params?.country || 'Unknown'} - ${scenario.params?.depth || 0}ft`,
    cost: scenario.totalCost,
    region: scenario.params?.region || 'Unknown'
  }));

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-warning text-dark">
        <h5 className="mb-0">Scenario Comparison</h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="cost" fill="#1e3a8a" name="Total Cost" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default CostBarChart;
