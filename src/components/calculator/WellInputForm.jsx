import { useState, useEffect } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import DepthInput from './DepthInput';
import LocationSelector from './LocationSelector';
import RegionSelector from './RegionSelector';
import RigTypeSelector from './RigTypeSelector';
import DrillingDaysSlider from './DrillingDaysSlider';
import GlobalDrillingCalculator from '../../utils/calculators/globalCostCalculator';
import { CURRENCY_SYMBOLS } from '../../utils/calculators/regionalData';

const WellInputForm = ({ onCalculate, compact = false }) => {
  const [formData, setFormData] = useState({
    depth: 10000,
    region: 'USA',
    country: 'permianBasin',
    location: 'onshore',
    rigType: 'standard',
    drillingDays: 25,
    currency: 'USD',
    oilPrice: 75
  });

  const calculator = new GlobalDrillingCalculator();

  useEffect(() => {
    // Load currency rates on mount
    calculator.loadCurrencyRates();
  }, []);

  useEffect(() => {
    // Calculate whenever form data changes
    const results = calculator.calculateCost(formData);
    if (onCalculate) {
      onCalculate({ ...results, params: formData });
    }
  }, [formData]);

  const handleRegionChange = (region, country) => {
    setFormData(prev => ({
      ...prev,
      region,
      country,
      // Reset rig type to standard when region changes
      rigType: 'standard'
    }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({
      ...prev,
      location,
      // Adjust default rig type based on location
      rigType: location === 'offshore' ? 'jackup' : 'standard',
      // Adjust drilling days based on location
      drillingDays: location === 'offshore' ? 90 : 25
    }));
  };

  // For compact mode, render just the form without the card wrapper
  const formContent = (
    <Form>
      <DepthInput
        value={formData.depth}
        onChange={(depth) => setFormData(prev => ({ ...prev, depth }))}
        compact={compact}
      />

      <LocationSelector
        value={formData.location}
        onChange={handleLocationChange}
        compact={compact}
      />

      <RegionSelector
        region={formData.region}
        country={formData.country}
        onRegionChange={handleRegionChange}
        compact={compact}
      />

      <RigTypeSelector
        value={formData.rigType}
        onChange={(rigType) => setFormData(prev => ({ ...prev, rigType }))}
        location={formData.location}
        region={formData.region}
        compact={compact}
      />

      <Form.Group className={compact ? "mb-2" : "mb-3"}>
        <Form.Label htmlFor="currency-select" className={compact ? "small mb-1" : ""}>
          Currency
        </Form.Label>
        <Form.Select
          id="currency-select"
          size={compact ? "sm" : undefined}
          value={formData.currency}
          onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
          aria-label="Select currency for cost display"
        >
          {Object.keys(CURRENCY_SYMBOLS).map(curr => (
            <option key={curr} value={curr}>
              {curr} ({CURRENCY_SYMBOLS[curr]})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <DrillingDaysSlider
        value={formData.drillingDays}
        onChange={(drillingDays) => setFormData(prev => ({ ...prev, drillingDays }))}
        compact={compact}
      />

      <Form.Group className={compact ? "mb-2" : "mb-3"}>
        <Form.Label htmlFor="oil-price-input" className={compact ? "small mb-1" : ""}>
          Oil Price ($/barrel)
        </Form.Label>
        <Form.Control
          id="oil-price-input"
          type="number"
          size={compact ? "sm" : undefined}
          value={formData.oilPrice}
          onChange={(e) => setFormData(prev => ({ ...prev, oilPrice: parseFloat(e.target.value) || 75 }))}
          min="20"
          max="200"
          step="1"
        />
      </Form.Group>
    </Form>
  );

  if (compact) {
    return formContent;
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h2 className="h5 mb-0">Well Parameters</h2>
      </Card.Header>
      <Card.Body>
        {formContent}
      </Card.Body>
    </Card>
  );
};

export default WellInputForm;
