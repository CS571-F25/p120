import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CostPieChart = ({ results }) => {
  if (!results || !results.breakdown) return null;

  const { breakdown } = results;

  // Prepare data for pie chart
  const data = breakdown.map(item => ({
    name: item.name.split('(')[0].trim(), // Shorten name for display
    value: item.finalCost
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Cost Distribution</h5>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatCurrency} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default CostPieChart;
