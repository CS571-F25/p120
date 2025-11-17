import { useState, useEffect } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import DepthInput from './DepthInput';
import LocationSelector from './LocationSelector';
import RegionSelector from './RegionSelector';
import RigTypeSelector from './RigTypeSelector';
import DrillingDaysSlider from './DrillingDaysSlider';
import GlobalDrillingCalculator from '../../utils/calculators/globalCostCalculator';
import { CURRENCY_SYMBOLS } from '../../utils/calculators/regionalData';

const WellInputForm = ({ onCalculate }) => {
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

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">Well Parameters</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row>
            <Col md={6}>
              <DepthInput
                value={formData.depth}
                onChange={(depth) => setFormData(prev => ({ ...prev, depth }))}
              />
            </Col>
            <Col md={6}>
              <LocationSelector
                value={formData.location}
                onChange={handleLocationChange}
              />
            </Col>
          </Row>

          <RegionSelector
            region={formData.region}
            country={formData.country}
            onRegionChange={handleRegionChange}
          />

          <Row>
            <Col md={6}>
              <RigTypeSelector
                value={formData.rigType}
                onChange={(rigType) => setFormData(prev => ({ ...prev, rigType }))}
                location={formData.location}
                region={formData.region}
              />
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Currency</Form.Label>
                <Form.Select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                >
                  {Object.keys(CURRENCY_SYMBOLS).map(curr => (
                    <option key={curr} value={curr}>
                      {curr} ({CURRENCY_SYMBOLS[curr]})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <DrillingDaysSlider
            value={formData.drillingDays}
            onChange={(drillingDays) => setFormData(prev => ({ ...prev, drillingDays }))}
          />

          <Form.Group className="mb-3">
            <Form.Label>Oil Price ($/barrel) for Economic Analysis</Form.Label>
            <Form.Control
              type="number"
              value={formData.oilPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, oilPrice: parseFloat(e.target.value) || 75 }))}
              min="20"
              max="200"
              step="1"
            />
            <Form.Text className="text-muted">
              Current WTI crude oil price assumption
            </Form.Text>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WellInputForm;
