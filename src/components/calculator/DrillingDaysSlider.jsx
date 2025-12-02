import { Form } from 'react-bootstrap';

const DrillingDaysSlider = ({ value, onChange, compact = false }) => {
  return (
    <Form.Group className={compact ? "mb-2" : "mb-3"}>
      <Form.Label htmlFor="drilling-days-slider" className={compact ? "small mb-1" : ""}>
        Drilling Days: <strong>{value}</strong> days
      </Form.Label>
      <Form.Range
        id="drilling-days-slider"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        min="10"
        max="180"
        step="5"
        aria-label="Select number of drilling days"
        aria-valuemin="10"
        aria-valuemax="180"
        aria-valuenow={value}
      />
      <div className="d-flex justify-content-between text-muted small">
        <span>10 days</span>
        <span>180 days</span>
      </div>
      {!compact && (
        <Form.Text className="text-muted">
          Typical onshore: 20-40 days | Typical offshore: 60-120 days
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default DrillingDaysSlider;
