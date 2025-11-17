import { Form } from 'react-bootstrap';

const DrillingDaysSlider = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        Drilling Days: <strong>{value}</strong> days
      </Form.Label>
      <Form.Range
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        min="10"
        max="180"
        step="5"
        aria-label="Select number of drilling days"
      />
      <div className="d-flex justify-content-between text-muted small">
        <span>10 days</span>
        <span>180 days</span>
      </div>
      <Form.Text className="text-muted">
        Typical onshore: 20-40 days | Typical offshore: 60-120 days
      </Form.Text>
    </Form.Group>
  );
};

export default DrillingDaysSlider;
