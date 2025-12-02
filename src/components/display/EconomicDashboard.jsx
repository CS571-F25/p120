import { Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FaChartLine, FaDollarSign, FaPercentage, FaClock } from 'react-icons/fa';

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
    <div role="region" aria-label="Economic Analysis Results">
      <Row className="mb-4 g-3">
        <Col md={3} sm={6}>
          <Card className="border-primary h-100">
            <Card.Body className="text-center">
              <FaDollarSign className="text-primary mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true" />
              <p className="text-muted small mb-1">Break-Even Price</p>
              <p className="h4 mb-2">${breakEvenPrice.toFixed(2)}/barrel</p>
              <Badge bg={breakEvenPrice < 50 ? 'success' : 'warning'}>
                {breakEvenPrice < 50 ? 'Low risk' : 'Higher risk'}
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-success h-100">
            <Card.Body className="text-center">
              <FaChartLine className="text-success mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true" />
              <p className="text-muted small mb-1">Net Present Value (NPV)</p>
              <p className={`h4 mb-2 text-${getStatusColor(npv)}`}>
                {formatCurrency(npv)}
              </p>
              <Badge bg={getStatusColor(npv)}>
                {npv > 0 ? 'Profitable' : 'Not profitable'}
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-info h-100">
            <Card.Body className="text-center">
              <FaPercentage className="text-info mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true" />
              <p className="text-muted small mb-1">Return on Investment</p>
              <p className={`h4 mb-2 text-${getStatusColor(roi)}`}>
                {roi.toFixed(1)}%
              </p>
              <Badge bg={getStatusColor(roi)}>
                {roi > 20 ? 'Strong returns' : 'Marginal returns'}
              </Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="border-warning h-100">
            <Card.Body className="text-center">
              <FaClock className="text-warning mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true" />
              <p className="text-muted small mb-1">Payback Period</p>
              <p className="h4 mb-2">{paybackMonths.toFixed(1)} months</p>
              <Badge bg={paybackMonths < 24 ? 'success' : 'warning'}>
                {paybackMonths < 24 ? 'Quick recovery' : 'Extended recovery'}
              </Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Header className="bg-light">
          <p className="h6 mb-0">NPV Sensitivity to Oil Price</p>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensitivity} role="img" aria-label="Chart showing NPV sensitivity to oil price changes">
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
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
              />
              <Legend />
              <ReferenceLine y={0} stroke="#dc3545" strokeDasharray="3 3" label={{ value: 'Break-even', fill: '#dc3545' }} />
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
        </Card.Body>
      </Card>

      <Alert variant={recommendation.variant}>
        <Alert.Heading>
          <span className="me-2" aria-hidden="true">{recommendation.icon}</span>
          {recommendation.title}
        </Alert.Heading>
        <p className="mb-0">{recommendation.message}</p>
      </Alert>
    </div>
  );
};

export default EconomicDashboard;
