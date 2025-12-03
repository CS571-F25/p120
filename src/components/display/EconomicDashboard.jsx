import { Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FaChartLine, FaDollarSign, FaPercentage, FaClock } from 'react-icons/fa';
import { CURRENCY_SYMBOLS, STATIC_EXCHANGE_RATES } from '../../utils/calculators/regionalData';

const EconomicDashboard = ({ economics, drillingCost, currency = 'USD' }) => {
  if (!economics) return null;

  const { breakEvenPrice, npv, roi, paybackMonths, sensitivity } = economics;

  // Get currency symbol and exchange rate for conversion
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const exchangeRate = STATIC_EXCHANGE_RATES[currency] || 1;

  // Convert USD values to selected currency
  const convertedNpv = npv * exchangeRate;
  const convertedBreakEven = breakEvenPrice * exchangeRate;

  // Convert sensitivity data to selected currency
  const convertedSensitivity = sensitivity.map(item => ({
    ...item,
    oilPrice: item.oilPrice * exchangeRate,
    npv: item.npv * exchangeRate
  }));

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
    return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
  };

  const formatPrice = (value) => {
    return `${currencySymbol}${value.toFixed(2)}`;
  };

  return (
    <div role="region" aria-label="Economic Analysis Results">
      <Row className="mb-4 g-3">
        <Col md={3} sm={6}>
          <Card className="border-primary h-100">
            <Card.Body className="text-center">
              <FaDollarSign className="text-primary mb-2" style={{ fontSize: '1.5rem' }} aria-hidden="true" />
              <p className="text-muted small mb-1">Break-Even Price</p>
              <p className="h4 mb-2">{formatPrice(convertedBreakEven)}/barrel</p>
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
                {formatCurrency(convertedNpv)}
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
          <p className="h6 mb-0">NPV Sensitivity to Oil Price ({currency})</p>
        </Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={convertedSensitivity} role="img" aria-label="Chart showing NPV sensitivity to oil price changes">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="oilPrice"
                tickFormatter={(value) => `${currencySymbol}${value.toFixed(0)}`}
                label={{ value: `Oil Price (${currencySymbol}/barrel)`, position: 'insideTop', offset: 22 }}
              />
              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
                label={{ value: `NPV (${currencySymbol})`, angle: -90, position: 'insideLeft', offset: 75}}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'npv') return [formatCurrency(value), 'NPV'];
                  return [`${currencySymbol}${value.toFixed(2)}`, name];
                }}
                labelFormatter={(label) => `Oil Price: ${currencySymbol}${label.toFixed(2)}/barrel`}
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
