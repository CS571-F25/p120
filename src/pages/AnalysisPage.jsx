import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Modal, Card } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import CostBarChart from '../components/display/CostBarChart';
import CostBreakdownTable from '../components/display/CostBreakdownTable';
import CostPieChart from '../components/display/CostPieChart';
import EconomicDashboard from '../components/display/EconomicDashboard';
import { storage } from '../utils/storage';
import { EconomicAnalyzer } from '../utils/calculators/economicAnalysis';
import { formatRegionName, formatCountryName, CURRENCY_SYMBOLS } from '../utils/calculators/regionalData';
import { FaChartBar, FaEye, FaChartLine, FaPrint, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const AnalysisPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEconomicsModal, setShowEconomicsModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [economics, setEconomics] = useState(null);

  const economicAnalyzer = new EconomicAnalyzer();

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    const saved = storage.getScenarios();
    setScenarios(saved);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this scenario?')) {
      storage.deleteScenario(id);
      loadScenarios();
    }
  };

  const handleViewDetails = (scenario) => {
    setSelectedScenario(scenario);
    setShowDetailsModal(true);
  };

  const handleViewEconomics = (scenario) => {
    setSelectedScenario(scenario);
    const economicResults = economicAnalyzer.calculateEconomics(
      scenario.totalCost,
      {
        depth: scenario.params?.depth || 10000,
        region: scenario.params?.region || 'USA',
        location: scenario.params?.location || 'onshore',
        oilPrice: scenario.params?.oilPrice || 75
      }
    );
    setEconomics(economicResults);
    setShowEconomicsModal(true);
  };

  const handlePrint = (scenario) => {
    const economicResults = economicAnalyzer.calculateEconomics(
      scenario.totalCost,
      {
        depth: scenario.params?.depth || 10000,
        region: scenario.params?.region || 'USA',
        location: scenario.params?.location || 'onshore',
        oilPrice: scenario.params?.oilPrice || 75
      }
    );

    const printWindow = window.open('', '_blank');
    const symbol = CURRENCY_SYMBOLS[scenario.currency] || '$';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>WellWise Report - ${scenario.name}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
          body { padding: 20px; font-family: Arial, sans-serif; }
          .header { border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-bottom: 20px; }
          .section { margin-bottom: 30px; page-break-inside: avoid; }
          .metric-card { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #dee2e6; padding: 8px; text-align: left; }
          th { background: #f8f9fa; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>WellWise Drilling Cost Report</h1>
          <h2>${scenario.name}</h2>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="section">
          <h3>Scenario Details</h3>
          <div class="row">
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Total Cost</p><h4>${symbol}${scenario.totalCost?.toLocaleString() || 'N/A'}</h4></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Region</p><p class="mb-0">${formatRegionName(scenario.params?.region)}</p><p class="mb-0">${formatCountryName(scenario.params?.country)}</p></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Depth</p><p class="mb-0">${scenario.params?.depth?.toLocaleString() || 'N/A'} ft</p></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Location</p><p class="mb-0 text-capitalize">${scenario.params?.location || 'N/A'}</p></div></div>
          </div>
          ${scenario.notes ? `<p class="mt-3"><strong>Notes:</strong> ${scenario.notes}</p>` : ''}
        </div>
        <div class="section">
          <h3>Cost Breakdown</h3>
          <table><thead><tr><th>Component</th><th>Base Cost</th><th>Multiplier</th><th>Final Cost</th><th>%</th></tr></thead><tbody>
          ${scenario.breakdown?.map(item => `<tr><td>${item.name}</td><td>${symbol}${item.baseCost?.toLocaleString()}</td><td>${item.multiplier}x</td><td>${symbol}${item.finalCost?.toLocaleString()}</td><td>${item.percentage?.toFixed(1)}%</td></tr>`).join('') || ''}
          </tbody></table>
        </div>
        <div class="section">
          <h3>Economic Analysis</h3>
          <div class="row">
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Break-Even Price</p><h5>$${economicResults.breakEvenPrice?.toFixed(2)}/bbl</h5></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">NPV</p><h5>$${(economicResults.npv / 1000000)?.toFixed(2)}M</h5></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">ROI</p><h5>${economicResults.roi?.toFixed(1)}%</h5></div></div>
            <div class="col-3"><div class="metric-card"><p class="text-muted small mb-1">Payback</p><h5>${economicResults.paybackMonths?.toFixed(1)} mo</h5></div></div>
          </div>
        </div>
        <div class="no-print mt-4"><button onclick="window.print()" class="btn btn-primary">Print Report</button><button onclick="window.close()" class="btn btn-secondary ms-2">Close</button></div>
      </body></html>
    `);
    printWindow.document.close();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL scenarios? This cannot be undone.')) {
      storage.clearAll();
      loadScenarios();
    }
  };

  const formatCurrency = (amount, currency) => {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    return `${symbol}${amount?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) || '0'}`;
  };

  return (
    <PageContainer
      backgroundImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1920&q=80"
      backgroundAlt="Oil refinery at night with industrial lights representing energy analysis"
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h2 fw-bold text-white">
              <FaChartLine className="me-2 text-warning" aria-hidden="true" />
              Scenario Analysis
            </h1>
            <p className="text-light mb-0">Analyze, compare, and manage your saved drilling scenarios</p>
          </div>
          <div className="d-flex gap-2">
            {scenarios.length >= 1 && (
              <Button variant="warning" onClick={() => setShowComparisonModal(true)} className="fw-bold">
                <FaChartBar className="me-2" aria-hidden="true" />Compare Scenarios
              </Button>
            )}
            {scenarios.length > 0 && (
              <Button variant="outline-light" onClick={handleClearAll}>
                <FaTrash className="me-2" aria-hidden="true" />Clear All
              </Button>
            )}
          </div>
        </div>

        {scenarios.length === 0 ? (
          <Alert variant="info" className="bg-info bg-opacity-75 border-0">
            <Alert.Heading as="h2"><FaExclamationTriangle className="me-2" aria-hidden="true" />No Saved Scenarios</Alert.Heading>
            <p className="mb-0">You haven't saved any scenarios yet. Go to the Calculator page to create and save drilling scenarios.</p>
          </Alert>
        ) : (
          <Row className="g-4">
            {scenarios.map((scenario) => (
              <Col key={scenario.id} md={4} sm={6} xs={12}>
                <Card className="shadow bg-dark bg-opacity-75 text-white border-0" style={{ minHeight: '380px' }}>
                  <Card.Header className="bg-primary border-0">
                    <h2 className="h5 mb-0 text-truncate">{scenario.name}</h2>
                    <small className="text-light">{new Date(scenario.savedAt).toLocaleDateString()}</small>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-3">
                      <p className="h2 text-warning mb-0">{formatCurrency(scenario.totalCost, scenario.currency)}</p>
                      <p className="text-light small mb-0">Total Estimated Cost</p>
                    </div>
                    <Row className="mb-3 text-center g-2">
                      <Col xs={6}><div className="bg-dark rounded p-2"><p className="small text-muted mb-0">Region</p><p className="small mb-0">{formatCountryName(scenario.params?.country)}</p></div></Col>
                      <Col xs={6}><div className="bg-dark rounded p-2"><p className="small text-muted mb-0">Depth</p><p className="small mb-0">{scenario.params?.depth?.toLocaleString()} ft</p></div></Col>
                    </Row>
                    {scenario.notes && <p className="small text-light mb-2 text-truncate"><strong>Notes:</strong> {scenario.notes}</p>}
                    <div className="d-grid gap-2 mt-auto">
                      <Button variant="success" onClick={() => handleViewEconomics(scenario)}><FaChartLine className="me-2" aria-hidden="true" />Economic Analysis</Button>
                      <div className="d-flex gap-2">
                        <Button variant="info" className="flex-grow-1" onClick={() => handleViewDetails(scenario)}><FaEye className="me-2" aria-hidden="true" />View Details</Button>
                        <Button variant="secondary" onClick={() => handlePrint(scenario)} aria-label={`Print report for ${scenario.name}`}><FaPrint aria-hidden="true" /></Button>
                      </div>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(scenario.id)}><FaTrash className="me-2" aria-hidden="true" />Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Details Modal */}
        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
          <Modal.Header closeButton className="bg-info text-white">
            <Modal.Title><FaEye className="me-2" aria-hidden="true" />{selectedScenario?.name} - Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedScenario && (
              <>
                {selectedScenario.notes && <Alert variant="info"><strong>Notes:</strong> {selectedScenario.notes}</Alert>}
                <CostBreakdownTable results={selectedScenario} />
                <CostPieChart results={selectedScenario} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button></Modal.Footer>
        </Modal>

        {/* Economics Modal */}
        <Modal show={showEconomicsModal} onHide={() => setShowEconomicsModal(false)} size="xl">
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title><FaChartLine className="me-2" aria-hidden="true" />{selectedScenario?.name} - Economic Analysis</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedScenario && economics && <EconomicDashboard economics={economics} drillingCost={selectedScenario.totalCost} />}</Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={() => setShowEconomicsModal(false)}>Close</Button></Modal.Footer>
        </Modal>

        {/* Comparison Modal */}
        <Modal show={showComparisonModal} onHide={() => setShowComparisonModal(false)} size="lg">
          <Modal.Header closeButton className="bg-warning">
            <Modal.Title><FaChartBar className="me-2" aria-hidden="true" />Scenario Comparison</Modal.Title>
          </Modal.Header>
          <Modal.Body><CostBarChart scenarios={scenarios} /></Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={() => setShowComparisonModal(false)}>Close</Button></Modal.Footer>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default AnalysisPage;
