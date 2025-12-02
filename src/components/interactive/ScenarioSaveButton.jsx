import { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { storage } from '../../utils/storage';

const ScenarioSaveButton = ({ results, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioNotes, setScenarioNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (!scenarioName.trim()) {
      setError('Please enter a scenario name');
      return;
    }

    try {
      const scenario = {
        name: scenarioName,
        notes: scenarioNotes,
        ...results
      };

      storage.saveScenario(scenario);
      setSuccess(true);
      setError('');

      // Notify parent component
      if (onSave) {
        onSave(scenario);
      }

      // Close modal after 1.5 seconds
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
        setScenarioName('');
        setScenarioNotes('');
      }, 1500);
    } catch (err) {
      setError('Failed to save scenario. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        className="me-2"
      >
        Save Scenario
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Scenario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success && (
            <Alert variant="success">Scenario saved successfully!</Alert>
          )}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="scenario-name-input">Scenario Name *</Form.Label>
              <Form.Control
                id="scenario-name-input"
                type="text"
                placeholder="e.g., Permian Basin Deep Well"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
                autoFocus
                aria-required="true"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="scenario-notes-input">Notes (Optional)</Form.Label>
              <Form.Control
                id="scenario-notes-input"
                as="textarea"
                rows={3}
                placeholder="Add any additional notes about this scenario..."
                value={scenarioNotes}
                onChange={(e) => setScenarioNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={success}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScenarioSaveButton;
