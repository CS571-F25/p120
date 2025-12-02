import { Form } from 'react-bootstrap';

const DepthInput = ({ value, onChange, compact = false }) => {
  return (
    <Form.Group className={compact ? "mb-2" : "mb-3"}>
      <Form.Label htmlFor="depth-input" className={compact ? "small mb-1" : ""}>
        Well Depth (feet)
      </Form.Label>
      <Form.Control
        id="depth-input"
        type="number"
        size={compact ? "sm" : undefined}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min="1000"
        max="40000"
        step="100"
        placeholder="Enter depth in feet"
      />
      {!compact && (
        <Form.Text className="text-muted">
          Typical range: 5,000 - 30,000 feet
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default DepthInput;
