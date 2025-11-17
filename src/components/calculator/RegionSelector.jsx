import { Form } from 'react-bootstrap';
import { REGIONAL_MULTIPLIERS, formatRegionName, formatCountryName } from '../../utils/calculators/regionalData';

const RegionSelector = ({ region, country, onRegionChange }) => {
  const regions = Object.keys(REGIONAL_MULTIPLIERS);

  const handleChange = (e) => {
    const [selectedRegion, selectedCountry] = e.target.value.split('|');
    onRegionChange(selectedRegion, selectedCountry);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Region & Country</Form.Label>
      <Form.Select
        value={`${region}|${country}`}
        onChange={handleChange}
        aria-label="Select drilling region and country"
      >
        {regions.map(regionKey => (
          <optgroup key={regionKey} label={formatRegionName(regionKey)}>
            {Object.keys(REGIONAL_MULTIPLIERS[regionKey]).map(countryKey => (
              <option
                key={`${regionKey}-${countryKey}`}
                value={`${regionKey}|${countryKey}`}
              >
                {formatCountryName(countryKey)}
                (Cost Multiplier: {REGIONAL_MULTIPLIERS[regionKey][countryKey]}x)
              </option>
            ))}
          </optgroup>
        ))}
      </Form.Select>
      <Form.Text className="text-muted">
        Regional multipliers account for local labor, equipment, and regulatory costs
      </Form.Text>
    </Form.Group>
  );
};

export default RegionSelector;
