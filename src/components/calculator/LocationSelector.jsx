import { Form } from 'react-bootstrap';

const LocationSelector = ({ value, onChange, compact = false }) => {
  return (
    <Form.Group className={compact ? "mb-2" : "mb-3"}>
      <Form.Label htmlFor="location-select" className={compact ? "small mb-1" : ""}>
        Drilling Location
      </Form.Label>
      <Form.Select
        id="location-select"
        size={compact ? "sm" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select drilling location"
      >
        <option value="onshore">Onshore</option>
        <option value="offshore">Offshore</option>
      </Form.Select>
      {!compact && (
        <Form.Text className="text-muted">
          Offshore drilling typically costs 3-5x more than onshore
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default LocationSelector;
