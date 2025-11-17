import { Form } from 'react-bootstrap';

const DepthInput = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Well Depth (feet)</Form.Label>
      <Form.Control
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min="1000"
        max="40000"
        step="100"
        placeholder="Enter depth in feet"
      />
      <Form.Text className="text-muted">
        Typical range: 5,000 - 30,000 feet
      </Form.Text>
    </Form.Group>
  );
};

export default DepthInput;
