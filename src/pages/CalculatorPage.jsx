import { useState } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import WellInputForm from '../components/calculator/WellInputForm';
import CostSummaryCard from '../components/display/CostSummaryCard';
import CostPieChart from '../components/display/CostPieChart';
import CostBreakdownTable from '../components/display/CostBreakdownTable';
import ScenarioSaveButton from '../components/interactive/ScenarioSaveButton';
import { FaCalculator, FaChartPie, FaDollarSign, FaTable } from 'react-icons/fa';

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
      fluid={true}
    >
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

      {/* Main Content - Full Width Layout */}
      <Row className="g-3">
        {/* Calculator Input Form */}
        <Col xl={4} lg={4} sm={6} xs={12}>
          <Card className="shadow h-100 border-0">
            <Card.Header className="bg-primary text-white py-2">
              <h2 className="h5 mb-0">
                <FaCalculator className="me-2" aria-hidden="true" />
                Well Parameters
              </h2>
            </Card.Header>
            <Card.Body className="p-3" style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
              <WellInputForm onCalculate={handleCalculate} compact={true} />
            </Card.Body>
          </Card>
        </Col>

        {/* Cost Summary */}
        <Col xl={4} lg={4} sm={6} xs={12}>
          <Card className="shadow h-100 border-0">
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
                  <div className="mt-3 text-center">
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

        {/* Cost Breakdown Table & Cost Distribution Pie Chart */}
        <Col xl={4} lg={4} sm={6} xs={12}>
                  <Card className="shadow h-100 border-0">
            <Card.Header className="bg-warning text-dark py-2">
              <h2 className="h5 mb-0">
                <FaTable className="me-2" aria-hidden="true" />
                Cost Breakdown
              </h2>
            </Card.Header>
            <Card.Body className="p-2">
              {results ? (
                <CostBreakdownTable results={results} compact={true} />
              ) : (
                <div className="text-center text-muted py-5">
                  <FaTable style={{ fontSize: '3rem', opacity: 0.3 }} aria-hidden="true" />
                  <p className="mt-3">Breakdown will appear after calculation</p>
                </div>
              )}
            </Card.Body>
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
    </PageContainer>
  );
};

export default CalculatorPage;
