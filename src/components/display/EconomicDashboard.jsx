import { Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const EconomicDashboard = ({ economics, drillingCost }) => {
  if (!economics) return null;

  const { breakEvenPrice, npv, roi, paybackMonths, sensitivity } = economics;

  const getStatusColor = (value) => {
    if (value > 0) return 'success';
    if (value < 0) return 'danger';
    return 'secondary';
  };

  const getRecommendation = () => {
    if (npv > drillingCost * 0.5) {
      return {
        variant: 'success',
        icon: '✓',
        title: 'Strong Investment Opportunity',
        message: 'NPV exceeds 50% of initial cost. Highly recommended.'
      };
    } else if (npv > 0 && roi > 15) {
      return {
        variant: 'warning',
        icon: '⚠',
        title: 'Moderate Investment Opportunity',
        message: 'Positive returns expected. Consider risk factors and alternatives.'
      };
    } else if (npv > 0) {
      return {
        variant: 'info',
        icon: '⚠',
        title: 'Marginal Investment',
        message: 'Minimal positive returns. High sensitivity to oil price changes.'
      };
    } else {
      return {
        variant: 'danger',
        icon: '✗',
        title: 'Not Recommended',
        message: 'Negative returns at current oil prices. Wait for better market conditions.'
      };
    }
  };

  const recommendation = getRecommendation();

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  return (
    <div>
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">Economic Analysis Results</h5>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={3}>
              <Card className="border-primary h-100">
                <Card.Body className="text-center">
                  <h6 className="text-muted small">Break-Even Price</h6>
                  <h4>${breakEvenPrice.toFixed(2)}/barrel</h4>
                  <Badge bg={breakEvenPrice < 50 ? 'success' : 'warning'}>
                    {breakEvenPrice < 50 ? 'Low risk' : 'Higher risk'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-success h-100">
                <Card.Body className="text-center">
                  <h6 className="text-muted small">Net Present Value (NPV)</h6>
                  <h4 className={`text-${getStatusColor(npv)}`}>
                    {formatCurrency(npv)}
                  </h4>
                  <Badge bg={getStatusColor(npv)}>
                    {npv > 0 ? 'Profitable' : 'Not profitable'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-info h-100">
                <Card.Body className="text-center">
                  <h6 className="text-muted small">Return on Investment</h6>
                  <h4 className={`text-${getStatusColor(roi)}`}>
                    {roi.toFixed(1)}%
                  </h4>
                  <Badge bg={getStatusColor(roi)}>
                    {roi > 20 ? 'Strong returns' : 'Marginal returns'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-warning h-100">
                <Card.Body className="text-center">
                  <h6 className="text-muted small">Payback Period</h6>
                  <h4>{paybackMonths.toFixed(1)} months</h4>
                  <Badge bg={paybackMonths < 24 ? 'success' : 'warning'}>
                    {paybackMonths < 24 ? 'Quick recovery' : 'Extended recovery'}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h6 className="mb-3">NPV Sensitivity to Oil Price</h6>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensitivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="oilPrice"
                label={{ value: 'Oil Price ($/barrel)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                tickFormatter={formatCurrency}
                label={{ value: 'NPV', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'npv') return [formatCurrency(value), 'NPV'];
                  return [value, name];
                }}
              />
              <Legend />
              <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" label="Break-even" />
              <Line
                type="monotone"
                dataKey="npv"
                stroke="#1e3a8a"
                name="Net Present Value"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <Alert variant={recommendation.variant} className="mt-4">
            <Alert.Heading>
              <span className="me-2">{recommendation.icon}</span>
              {recommendation.title}
            </Alert.Heading>
            <p className="mb-0">{recommendation.message}</p>
          </Alert>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EconomicDashboard;
