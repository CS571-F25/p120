import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import WellInputForm from '../components/calculator/WellInputForm';
import CostSummaryCard from '../components/display/CostSummaryCard';
import CostPieChart from '../components/display/CostPieChart';
import ScenarioSaveButton from '../components/interactive/ScenarioSaveButton';
import { FaCalculator, FaChartPie, FaDollarSign } from 'react-icons/fa';

const CalculatorPage = () => {
  const [results, setResults] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleCalculate = (calculationResults) => {
    setResults(calculationResults);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <PageContainer
      backgroundImage="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=1920&q=80"
      backgroundAlt="Offshore oil platform in the ocean representing drilling operations"
    >
      <Container fluid className="px-4">
        {/* Page Header */}
        <div className="text-center mb-3">
          <h1 className="h2 fw-bold text-white">
            <FaCalculator className="me-2 text-warning" aria-hidden="true" />
            Drilling Cost Calculator
          </h1>
        </div>

        {saveSuccess && (
          <Alert variant="success" dismissible onClose={() => setSaveSuccess(false)} className="mb-2">
            Scenario saved successfully! View it in the Analysis page.
          </Alert>
        )}

        {/* Main Content - Compact Layout */}
        <Row className="g-3" style={{ minHeight: 'calc(100vh - 180px)' }}>
          {/* Calculator Input Form */}
          <Col lg={4}>
            <Card className="h-100 shadow" style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
              <Card.Header className="bg-primary text-white py-2">
                <h2 className="h5 mb-0">
                  <FaCalculator className="me-2" aria-hidden="true" />
                  Well Parameters
                </h2>
              </Card.Header>
              <Card.Body className="p-3">
                <WellInputForm onCalculate={handleCalculate} compact={true} />
              </Card.Body>
            </Card>
          </Col>

          {/* Cost Summary */}
          <Col lg={4}>
            <Card className="h-100 shadow">
              <Card.Header className="bg-success text-white py-2">
                <h2 className="h5 mb-0">
                  <FaDollarSign className="me-2" aria-hidden="true" />
                  Cost Summary
                </h2>
              </Card.Header>
              <Card.Body className="p-3">
                {results ? (
                  <>
                    <CostSummaryCard results={results} compact={true} />
                    <div className="mt-3">
                      <ScenarioSaveButton results={results} onSave={handleSave} />
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted py-5">
                    <FaDollarSign style={{ fontSize: '3rem', opacity: 0.3 }} aria-hidden="true" />
                    <p className="mt-3">Enter well parameters to see cost estimates</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Cost Distribution Pie Chart */}
          <Col lg={4}>
            <Card className="h-100 shadow">
              <Card.Header className="bg-info text-white py-2">
                <h2 className="h5 mb-0">
                  <FaChartPie className="me-2" aria-hidden="true" />
                  Cost Distribution
                </h2>
              </Card.Header>
              <Card.Body className="p-2 d-flex align-items-center justify-content-center">
                {results ? (
                  <CostPieChart results={results} compact={true} />
                ) : (
                  <div className="text-center text-muted">
                    <FaChartPie style={{ fontSize: '3rem', opacity: 0.3 }} aria-hidden="true" />
                    <p className="mt-3">Chart will appear after calculation</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default CalculatorPage;
