import { Card, Row, Col, Badge } from 'react-bootstrap';
import { CURRENCY_SYMBOLS } from '../../utils/calculators/regionalData';
import { FaDollarSign, FaGlobe, FaMoneyBillWave } from 'react-icons/fa';

const CostSummaryCard = ({ results, compact = false }) => {
  if (!results) return null;

  const { totalCost, currency, regionalMultiplier, baseCost } = results;

  const formatCurrency = (amount) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  if (compact) {
    return (
      <div>
        <div className="text-center mb-3">
          <h3 className="h2 text-success mb-0">
            {formatCurrency(totalCost)}
          </h3>
          <p className="text-muted small mb-0">Total Estimated Cost</p>
        </div>

        <Row className="text-center g-2">
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <FaMoneyBillWave className="text-primary mb-1" aria-hidden="true" />
              <p className="small text-muted mb-0">Base</p>
              <p className="small fw-bold mb-0">{formatCurrency(baseCost)}</p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <FaGlobe className="text-info mb-1" aria-hidden="true" />
              <p className="small text-muted mb-0">Multiplier</p>
              <Badge bg={regionalMultiplier > 1 ? 'danger' : 'success'} className="mt-1">
                {regionalMultiplier}x
              </Badge>
            </div>
          </Col>
          <Col xs={4}>
            <div className="bg-light rounded p-2">
              <FaDollarSign className="text-success mb-1" aria-hidden="true" />
              <p className="small text-muted mb-0">Currency</p>
              <p className="small fw-bold mb-0">{currency}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-success text-white">
        <h2 className="h5 mb-0">Cost Summary</h2>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <h3 className="display-4 text-success mb-0">
            {formatCurrency(totalCost)}
          </h3>
          <p className="text-muted">Total Estimated Drilling Cost</p>
        </div>

        <Row className="text-center">
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <p className="text-muted small mb-1">Base Cost (USD)</p>
                <p className="h5 mb-0">{formatCurrency(baseCost)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <p className="text-muted small mb-1">Regional Multiplier</p>
                <p className="h5 mb-0">
                  <Badge bg={regionalMultiplier > 1 ? 'danger' : 'success'}>
                    {regionalMultiplier}x
                  </Badge>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 bg-light">
              <Card.Body>
                <p className="text-muted small mb-1">Currency</p>
                <p className="h5 mb-0">{currency}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CostSummaryCard;
