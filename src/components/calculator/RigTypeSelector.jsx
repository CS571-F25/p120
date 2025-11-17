import { Form } from 'react-bootstrap';
import { GLOBAL_RIG_RATES } from '../../utils/calculators/regionalData';

const RigTypeSelector = ({ value, onChange, location, region }) => {
  // Get available rig types based on location and region
  const getAvailableRigTypes = () => {
    const regionRates = GLOBAL_RIG_RATES[region] || GLOBAL_RIG_RATES.USA;
    const locationRates = regionRates[location];

    if (!locationRates) {
      // Fallback if region doesn't support this location type
      return [];
    }

    return Object.keys(locationRates).map(rigType => ({
      value: rigType,
      label: rigType.charAt(0).toUpperCase() + rigType.slice(1).replace(/([A-Z])/g, ' $1'),
      rate: locationRates[rigType]
    }));
  };

  const rigTypes = getAvailableRigTypes();

  return (
    <Form.Group className="mb-3">
      <Form.Label>Rig Type</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select rig type"
        disabled={rigTypes.length === 0}
      >
        {rigTypes.length === 0 ? (
          <option>No rigs available for this region/location</option>
        ) : (
          rigTypes.map(({ value: rigValue, label, rate }) => (
            <option key={rigValue} value={rigValue}>
              {label} (${rate.toLocaleString()}/day)
            </option>
          ))
        )}
      </Form.Select>
      <Form.Text className="text-muted">
        Day rates vary by region and rig capabilities
      </Form.Text>
    </Form.Group>
  );
};

export default RigTypeSelector;
