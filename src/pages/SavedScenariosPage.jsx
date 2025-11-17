import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Modal } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import ScenarioCard from '../components/interactive/ScenarioCard';
import CostBarChart from '../components/display/CostBarChart';
import CostBreakdownTable from '../components/display/CostBreakdownTable';
import { storage } from '../utils/storage';

const SavedScenariosPage = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleView = (scenario) => {
    setSelectedScenario(scenario);
    setShowModal(true);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL scenarios? This cannot be undone.')) {
      storage.clearAll();
      loadScenarios();
    }
  };

  return (
    <PageContainer>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-5 fw-bold">Saved Scenarios</h1>
            <p className="lead text-muted">
              Manage and compare your saved drilling scenarios
            </p>
          </div>
          {scenarios.length > 0 && (
            <Button variant="outline-danger" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </div>

        {scenarios.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No saved scenarios</Alert.Heading>
            <p>
              You haven't saved any scenarios yet. Go to the Home page to calculate and save drilling scenarios.
            </p>
          </Alert>
        ) : (
          <>
            <div className="mb-4">
              <h5>Scenario Comparison</h5>
              <CostBarChart scenarios={scenarios} />
            </div>

            <h5 className="mb-3">All Scenarios ({scenarios.length})</h5>
            <Row>
              {scenarios.map((scenario) => (
                <Col key={scenario.id} lg={6} xl={4}>
                  <ScenarioCard
                    scenario={scenario}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedScenario?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedScenario && (
              <>
                {selectedScenario.notes && (
                  <Alert variant="info">
                    <strong>Notes:</strong> {selectedScenario.notes}
                  </Alert>
                )}
                <CostBreakdownTable results={selectedScenario} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </PageContainer>
  );
};

export default SavedScenariosPage;
