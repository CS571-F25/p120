import { Form } from 'react-bootstrap';

const LocationSelector = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Drilling Location</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select drilling location"
      >
        <option value="onshore">Onshore</option>
        <option value="offshore">Offshore</option>
      </Form.Select>
      <Form.Text className="text-muted">
        Offshore drilling typically costs 3-5x more than onshore
      </Form.Text>
    </Form.Group>
  );
};

export default LocationSelector;
