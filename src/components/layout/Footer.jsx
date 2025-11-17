import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>WellWise</h5>
            <p className="text-muted">
              Global drilling cost estimation tool based on industry data and SPE methodologies.
            </p>
          </Col>
          <Col md={4}>
            <h6>Data Sources</h6>
            <ul className="list-unstyled text-muted small">
              <li>IHS Markit UCCI 2024</li>
              <li>Baker Hughes Rig Count</li>
              <li>EIA Drilling Reports</li>
              <li>SPE Cost Studies</li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Disclaimer</h6>
            <p className="text-muted small">
              All costs are estimates based on public data and industry averages.
              For commercial use, validate with local drilling contractors.
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center text-muted small">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} WellWise Drilling Calculator.
              For educational and preliminary planning purposes.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
