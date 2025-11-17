import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { formatRegionName, formatCountryName, CURRENCY_SYMBOLS } from '../../utils/calculators/regionalData';

const ScenarioCard = ({ scenario, onDelete, onView }) => {
  const { id, name, notes, totalCost, currency, params, savedAt } = scenario;

  const formatCurrency = (amount) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return `${symbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-sm mb-3">
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">{name}</h6>
          <Badge bg="secondary">{formatDate(savedAt)}</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          <Col>
            <h4 className="text-primary mb-0">{formatCurrency(totalCost)}</h4>
            <small className="text-muted">Total Cost</small>
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={6}>
            <small className="text-muted">Region:</small>
            <div>
              <Badge bg="info" className="me-1">
                {formatRegionName(params?.region)}
              </Badge>
              <Badge bg="info">
                {formatCountryName(params?.country)}
              </Badge>
            </div>
          </Col>
          <Col md={6}>
            <small className="text-muted">Depth:</small>
            <div>{params?.depth?.toLocaleString() || 'N/A'} ft</div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <small className="text-muted">Location:</small>
            <div className="text-capitalize">{params?.location || 'N/A'}</div>
          </Col>
          <Col md={6}>
            <small className="text-muted">Rig Type:</small>
            <div className="text-capitalize">{params?.rigType || 'N/A'}</div>
          </Col>
        </Row>

        {notes && (
          <div className="mb-3">
            <small className="text-muted">Notes:</small>
            <p className="mb-0 small">{notes}</p>
          </div>
        )}

        <div className="d-flex gap-2">
          {onView && (
            <Button variant="outline-primary" size="sm" onClick={() => onView(scenario)}>
              View Details
            </Button>
          )}
          {onDelete && (
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(id)}>
              Delete
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScenarioCard;
