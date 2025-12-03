import { Card, Table, Badge } from 'react-bootstrap';
import { CURRENCY_SYMBOLS, STATIC_EXCHANGE_RATES } from '../../utils/calculators/regionalData';

const CostBreakdownTable = ({ results, compact = false }) => {
  if (!results || !results.breakdown) return null;

  const { breakdown, currency = 'USD' } = results;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';
  const exchangeRate = STATIC_EXCHANGE_RATES[currency] || 1;

  // Convert USD values to selected currency
  const convertedBreakdown = breakdown.map(item => ({
    ...item,
    baseCost: item.baseCost * exchangeRate,
    finalCost: item.finalCost * exchangeRate
  }));

  const formatCurrency = (amount) => {
    return `${currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const tableContent = (
    <Table striped bordered hover responsive size={compact ? "sm" : undefined} className="mb-0">
      <thead className="table-light">
        <tr>
          <th>Component</th>
          {!compact && <th>Base Cost</th>}
          <th>Multiplier</th>
          <th>Final Cost</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {convertedBreakdown.map((item, index) => (
          <tr key={index}>
            <td className={compact ? "small" : ""}>{item.name.split('(')[0].trim()}</td>
            {!compact && <td>{formatCurrency(item.baseCost)}</td>}
            <td>
              <Badge bg="secondary">{item.multiplier}x</Badge>
            </td>
            <td className="fw-bold">{formatCurrency(item.finalCost)}</td>
            <td>{item.percentage.toFixed(1)}%</td>
          </tr>
        ))}
      </tbody>
      <tfoot className="table-light fw-bold">
        <tr>
          <td>Total</td>
          {!compact && (
            <td>
              {formatCurrency(
                convertedBreakdown.reduce((sum, item) => sum + item.baseCost, 0)
              )}
            </td>
          )}
          <td>-</td>
          <td>
            {formatCurrency(
              convertedBreakdown.reduce((sum, item) => sum + item.finalCost, 0)
            )}
          </td>
          <td>100%</td>
        </tr>
      </tfoot>
    </Table>
  );

  if (compact) {
    return tableContent;
  }

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-info text-white">
        <p className="h5 mb-0">Cost Breakdown Analysis</p>
      </Card.Header>
      <Card.Body>
        {tableContent}
        <div className="text-muted small mt-3">
          <p className="mb-0">
            * Costs adjusted for regional market conditions
          </p>
          <p className="mb-0">
            Source: IHS Markit UCCI 2024, Local regulatory data
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CostBreakdownTable;
