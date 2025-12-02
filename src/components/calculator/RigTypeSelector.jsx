import { Form } from 'react-bootstrap';
import { GLOBAL_RIG_RATES } from '../../utils/calculators/regionalData';

const RigTypeSelector = ({ value, onChange, location, region, compact = false }) => {
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
    <Form.Group className={compact ? "mb-2" : "mb-3"}>
      <Form.Label htmlFor="rig-type-select" className={compact ? "small mb-1" : ""}>
        Rig Type
      </Form.Label>
      <Form.Select
        id="rig-type-select"
        size={compact ? "sm" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select rig type"
        disabled={rigTypes.length === 0}
      >
        {rigTypes.length === 0 ? (
          <option>No rigs available</option>
        ) : (
          rigTypes.map(({ value: rigValue, label, rate }) => (
            <option key={rigValue} value={rigValue}>
              {label} (${rate.toLocaleString()}/day)
            </option>
          ))
        )}
      </Form.Select>
      {!compact && (
        <Form.Text className="text-muted">
          Day rates vary by region and rig capabilities
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default RigTypeSelector;
