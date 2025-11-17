import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import WellInputForm from '../components/calculator/WellInputForm';
import CostSummaryCard from '../components/display/CostSummaryCard';
import EconomicDashboard from '../components/display/EconomicDashboard';
import { EconomicAnalyzer } from '../utils/calculators/economicAnalysis';

const AnalysisPage = () => {
  const [results, setResults] = useState(null);
  const [economics, setEconomics] = useState(null);
  const [showEconomics, setShowEconomics] = useState(false);

  const economicAnalyzer = new EconomicAnalyzer();

  const handleCalculate = (calculationResults) => {
    setResults(calculationResults);

    // Calculate economics
    const economicResults = economicAnalyzer.calculateEconomics(
      calculationResults.totalCost,
      {
        depth: calculationResults.params.depth,
        region: calculationResults.params.region,
        location: calculationResults.params.location,
        oilPrice: calculationResults.params.oilPrice || 75
      }
    );

    setEconomics(economicResults);
  };

  return (
    <PageContainer>
      <Container>
        <div className="mb-4">
          <h1 className="display-5 fw-bold">Economic Analysis</h1>
          <p className="lead text-muted">
            Comprehensive economic analysis including NPV, ROI, and break-even calculations
          </p>
        </div>

        <Row>
          <Col lg={5}>
            <WellInputForm onCalculate={handleCalculate} />
          </Col>

          <Col lg={7}>
            {results && (
              <>
                <CostSummaryCard results={results} />

                <div className="mb-3">
                  <Button
                    variant={showEconomics ? 'secondary' : 'success'}
                    onClick={() => setShowEconomics(!showEconomics)}
                    className="w-100"
                  >
                    {showEconomics ? 'Hide' : 'Show'} Economic Analysis
                  </Button>
                </div>

                {showEconomics && economics && (
                  <EconomicDashboard
                    economics={economics}
                    drillingCost={results.totalCost}
                  />
                )}
              </>
            )}
            {!results && (
              <div className="text-center text-muted mt-5">
                <h4>Enter well parameters to see economic analysis</h4>
                <p>Economic analysis includes NPV, ROI, break-even price, and payback period</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default AnalysisPage;
