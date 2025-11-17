import { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import WellInputForm from '../components/calculator/WellInputForm';
import CostSummaryCard from '../components/display/CostSummaryCard';
import CostBreakdownTable from '../components/display/CostBreakdownTable';
import CostPieChart from '../components/display/CostPieChart';
import ScenarioSaveButton from '../components/interactive/ScenarioSaveButton';

const HomePage = () => {
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
    <PageContainer>
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">WellWise Drilling Calculator</h1>
          <p className="lead text-muted">
            Global oil & gas well drilling cost estimation tool
          </p>
          <p className="text-muted">
            Calculate drilling costs across different regions with real-time economic analysis
          </p>
        </div>

        {saveSuccess && (
          <Alert variant="success" dismissible onClose={() => setSaveSuccess(false)}>
            Scenario saved successfully! View it in the Saved Scenarios page.
          </Alert>
        )}

        <Row>
          <Col lg={5}>
            <WellInputForm onCalculate={handleCalculate} />
          </Col>

          <Col lg={7}>
            {results && (
              <>
                <div className="mb-3">
                  <ScenarioSaveButton results={results} onSave={handleSave} />
                </div>
                <CostSummaryCard results={results} />
                <CostBreakdownTable results={results} />
                <CostPieChart results={results} />
              </>
            )}
            {!results && (
              <div className="text-center text-muted mt-5">
                <h4>Enter well parameters to see cost estimates</h4>
                <p>Adjust the inputs on the left to calculate drilling costs</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default HomePage;
