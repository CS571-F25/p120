import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router';
import PageContainer from '../components/layout/PageContainer';
import { GiOilRig } from 'react-icons/gi';
import { FaCalculator, FaChartLine, FaSave, FaGlobe } from 'react-icons/fa';

const HomePage = () => {
  return (
    <PageContainer
      backgroundImage="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1920&q=80"
      backgroundAlt="Oil drilling rig at sunset with orange sky representing the oil and gas industry"
    >
      <Container className="py-5">
        {/* Hero Section - Golden Ratio: 61.8% for main content, 38.2% for supporting */}
        <Row className="align-items-center min-vh-75">
          {/* Main Content - 61.8% */}
          <Col lg={7} className="text-white mb-5 mb-lg-0">
            <h1 className="display-3 fw-bold mb-4">
              WellWise
              <span className="d-block text-warning">Drilling Calculator</span>
            </h1>

            <p className="lead mb-4" style={{ fontSize: '1.4rem' }}>
              Professional global oil & gas well drilling cost estimation tool
            </p>

            <Card className="bg-dark bg-opacity-75 border-0 mb-4">
              <Card.Body className="p-4">
                <h2 className="h4 text-warning mb-3">How to Use This Tool</h2>
                <ol className="text-light mb-0" style={{ fontSize: '1.1rem' }}>
                  <li className="mb-2">
                    <FaCalculator className="me-2 text-info" aria-hidden="true" />
                    Navigate to the <strong>Calculator</strong> page to input well parameters
                  </li>
                  <li className="mb-2">
                    <FaSave className="me-2 text-info" aria-hidden="true" />
                    Save your scenarios for later comparison
                  </li>
                  <li className="mb-2">
                    <FaChartLine className="me-2 text-info" aria-hidden="true" />
                    View <strong>Analysis</strong> page for economic analysis on saved scenarios
                  </li>
                  <li>
                    <FaGlobe className="me-2 text-info" aria-hidden="true" />
                    Compare costs across 20+ global regions
                  </li>
                </ol>
              </Card.Body>
            </Card>

            <Button
              as={Link}
              to="/calculator"
              variant="warning"
              size="lg"
              className="px-5 py-3 fw-bold shadow"
              style={{ fontSize: '1.2rem' }}
            >
              <FaCalculator className="me-2" aria-hidden="true" />
              Start Calculating
            </Button>
          </Col>

          {/* Drilling Rig Icon - 38.2% */}
          <Col lg={5} className="text-center">
            <div
              className="d-flex justify-content-center align-items-center"
              role="img"
              aria-label="Oil drilling rig icon representing petroleum industry equipment"
            >
              <GiOilRig
                style={{
                  fontSize: '20rem',
                  color: '#ffc107',
                  filter: 'drop-shadow(0 0 30px rgba(255, 193, 7, 0.5))'
                }}
                aria-hidden="true"
              />
            </div>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="mt-5 g-4">
          <Col md={4}>
            <Card className="h-100 bg-dark bg-opacity-75 border-warning text-white">
              <Card.Body className="text-center p-4">
                <FaGlobe className="text-warning mb-3" style={{ fontSize: '3rem' }} aria-hidden="true" />
                <h3 className="h5">Global Coverage</h3>
                <p className="text-light mb-0">
                  Cost data for USA, Middle East, North Sea, Asia-Pacific, and Latin America
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 bg-dark bg-opacity-75 border-info text-white">
              <Card.Body className="text-center p-4">
                <FaChartLine className="text-info mb-3" style={{ fontSize: '3rem' }} aria-hidden="true" />
                <h3 className="h5">Economic Analysis</h3>
                <p className="text-light mb-0">
                  NPV, ROI, break-even price, and payback period calculations
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 bg-dark bg-opacity-75 border-success text-white">
              <Card.Body className="text-center p-4">
                <FaSave className="text-success mb-3" style={{ fontSize: '3rem' }} aria-hidden="true" />
                <h3 className="h5">Save & Compare</h3>
                <p className="text-light mb-0">
                  Save multiple scenarios and compare them side by side
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default HomePage;
