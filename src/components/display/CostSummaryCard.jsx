import { Card, Row, Col, Badge } from 'react-bootstrap';
import { CURRENCY_SYMBOLS } from '../../utils/calculators/regionalData';

const CostSummaryCard = ({ results }) => {
  if (!results) return null;

  const { totalCost, currency, regionalMultiplier, baseCost } = results;

  const formatCurrency = (amount) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-success text-white">
        <h5 className="mb-0">Cost Summary</h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <h2 className="display-4 text-success mb-0">
            {formatCurrency(totalCost)}
          </h2>
          <p className="text-muted">Total Estimated Drilling Cost</p>
        </div>

        <Row className="text-center">
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <h6 className="text-muted small">Base Cost (USD)</h6>
                <h5>{formatCurrency(baseCost)}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <h6 className="text-muted small">Regional Multiplier</h6>
                <h5>
                  <Badge bg={regionalMultiplier > 1 ? 'danger' : 'success'}>
                    {regionalMultiplier}x
                  </Badge>
                </h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <h6 className="text-muted small">Currency</h6>
                <h5>{currency}</h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CostSummaryCard;
