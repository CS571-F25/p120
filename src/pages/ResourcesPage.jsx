import { Container, Card, Row, Col, Badge, Accordion } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';
import { FaBook, FaDatabase, FaCalculator, FaChartLine, FaExclamationTriangle, FaHistory } from 'react-icons/fa';

const ResourcesPage = () => {
  return (
    <PageContainer
      backgroundImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=80"
      backgroundAlt="Industrial oil and gas facility at dusk representing energy resources"
    >
      <Container>
        <div className="mb-4">
          <h1 className="h2 fw-bold text-white">
            <FaBook className="me-2 text-warning" aria-hidden="true" />
            Resources & Methodology
          </h1>
          <p className="lead text-light">
            Learn about our calculation methodology and data sources
          </p>
        </div>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="shadow-sm mb-4 bg-dark bg-opacity-75 text-white">
              <Card.Header className="bg-primary text-white">
                <h2 className="h5 mb-0">
                  <FaDatabase className="me-2" aria-hidden="true" />
                  Global Data Sources
                </h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h3 className="h6 text-warning">North America</h3>
                    <ul className="text-light">
                      <li>EIA (Energy Information Administration)</li>
                      <li>Baker Hughes Rig Count</li>
                      <li>SPE (Society of Petroleum Engineers) Papers</li>
                      <li>IHS Markit UCCI</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h3 className="h6 text-warning">Middle East</h3>
                    <ul className="text-light">
                      <li>OPEC Annual Statistical Bulletin 2024</li>
                      <li>OPEC Cost Studies</li>
                      <li>Regional regulatory data</li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h3 className="h6 text-warning">North Sea</h3>
                    <ul className="text-light">
                      <li>UK OGA Wells Insight Database</li>
                      <li>Norwegian Petroleum Directorate</li>
                      <li>Regional cost indices</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h3 className="h6 text-warning">Asia-Pacific & Latin America</h3>
                    <ul className="text-light">
                      <li>Wood Mackenzie Upstream Data Tool</li>
                      <li>ANP (Agência Nacional do Petróleo) Brazil</li>
                      <li>CNH Mexico</li>
                      <li>Petronas Activity Outlook</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm mb-4 bg-dark bg-opacity-75 text-white">
          <Card.Header className="bg-success text-white">
            <h2 className="h5 mb-0">
              <FaCalculator className="me-2" aria-hidden="true" />
              Calculation Methodology
            </h2>
          </Card.Header>
          <Card.Body>
            <h3 className="h6 text-warning">Base Cost Formula (SPE-170941-MS)</h3>
            <Card className="bg-light p-3 mb-3">
              <code>
                Total Cost = (Fixed Costs + Depth Costs + Rig Costs) × Regional Multiplier × Currency Rate
              </code>
            </Card>

            <Accordion className="bg-dark">
              <Accordion.Item eventKey="0" className="bg-dark text-white border-secondary">
                <Accordion.Header>Fixed Costs</Accordion.Header>
                <Accordion.Body className="bg-dark text-light">
                  <p>Base fixed costs include:</p>
                  <ul>
                    <li><strong>Onshore:</strong> $500,000 (permits, site preparation, infrastructure)</li>
                    <li><strong>Offshore:</strong> $2,000,000 (platform costs, marine logistics, regulatory)</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="bg-dark text-white border-secondary">
                <Accordion.Header>Depth Costs</Accordion.Header>
                <Accordion.Body className="bg-dark text-light">
                  <p>Cost per foot of depth:</p>
                  <ul>
                    <li><strong>Onshore:</strong> $150/foot (drilling, casing, cementing)</li>
                    <li><strong>Offshore:</strong> $400/foot (additional marine equipment, subsea completions)</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="bg-dark text-white border-secondary">
                <Accordion.Header>Rig Day Rates</Accordion.Header>
                <Accordion.Body className="bg-dark text-light">
                  <p>Daily rig costs vary by region and type:</p>
                  <Row>
                    <Col md={6}>
                      <h4 className="h6 text-warning">Onshore Rigs</h4>
                      <ul>
                        <li>Small: $10,000 - $15,000/day</li>
                        <li>Standard: $18,000 - $25,000/day</li>
                        <li>Premium: $28,000 - $35,000/day</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h4 className="h6 text-warning">Offshore Rigs</h4>
                      <ul>
                        <li>Jackup: $55,000 - $120,000/day</li>
                        <li>Semisubmersible: $180,000 - $380,000/day</li>
                        <li>Drillship: $400,000 - $550,000/day</li>
                      </ul>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className="bg-dark text-white border-secondary">
                <Accordion.Header>Regional Multipliers</Accordion.Header>
                <Accordion.Body className="bg-dark text-light">
                  <p>Regional adjustments account for:</p>
                  <ul>
                    <li>Labor costs and availability</li>
                    <li>Equipment and material costs</li>
                    <li>Regulatory requirements</li>
                    <li>Infrastructure availability</li>
                    <li>Local market conditions</li>
                  </ul>
                  <p className="mt-3"><strong>Example Multipliers:</strong></p>
                  <ul>
                    <li><Badge bg="success">Saudi Arabia: 0.65x</Badge> (lower costs)</li>
                    <li><Badge bg="primary">USA Permian: 1.0x</Badge> (baseline)</li>
                    <li><Badge bg="warning" text="dark">North Sea UK: 1.85x</Badge> (higher costs)</li>
                    <li><Badge bg="danger">Brazil Pre-Salt: 2.4x</Badge> (ultra-deepwater)</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>

        <Card className="shadow-sm mb-4 bg-dark bg-opacity-75 text-white">
          <Card.Header className="bg-info text-white">
            <h2 className="h5 mb-0">
              <FaChartLine className="me-2" aria-hidden="true" />
              Economic Analysis Methodology
            </h2>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h3 className="h6 text-warning">Net Present Value (NPV)</h3>
                <p className="small text-light">
                  Calculated using a 10% discount rate over a 3-year production profile
                  with a typical decline curve (50% Year 1, 30% Year 2, 20% Year 3).
                </p>
              </Col>
              <Col md={6}>
                <h3 className="h6 text-warning">Break-Even Price</h3>
                <p className="small text-light">
                  The oil price needed to recover all drilling costs and operating expenses,
                  accounting for 12.5% royalty and $15/barrel operating costs.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h3 className="h6 text-warning">Return on Investment (ROI)</h3>
                <p className="small text-light">
                  Total net revenue minus total cost, divided by total cost,
                  expressed as a percentage.
                </p>
              </Col>
              <Col md={6}>
                <h3 className="h6 text-warning">Payback Period</h3>
                <p className="small text-light">
                  Time in months to recover the initial drilling investment
                  from production revenue.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="shadow-sm mb-4 bg-dark bg-opacity-75">
          <Card.Header className="bg-warning text-dark">
            <h2 className="h5 mb-0">
              <FaExclamationTriangle className="me-2" aria-hidden="true" />
              Important Disclaimers
            </h2>
          </Card.Header>
          <Card.Body className="text-light">
            <ul className="mb-0">
              <li>All costs are estimates based on public data and industry averages</li>
              <li>Actual drilling costs vary significantly based on specific site conditions</li>
              <li>Regional multipliers are updated quarterly from IHS Markit UCCI</li>
              <li>This calculator is suitable for educational and preliminary planning purposes</li>
              <li>For commercial use, always validate estimates with local drilling contractors</li>
              <li>Economic analysis assumes typical production profiles and may not reflect actual well performance</li>
            </ul>
          </Card.Body>
        </Card>

        <Card className="shadow-sm bg-dark bg-opacity-75">
          <Card.Header className="bg-secondary text-white">
            <h2 className="h5 mb-0">
              <FaHistory className="me-2" aria-hidden="true" />
              Version History
            </h2>
          </Card.Header>
          <Card.Body className="text-light">
            <ul className="mb-0">
              <li><strong>v1.0:</strong> US-only calculator with basic features</li>
              <li><strong>v2.0:</strong> Global expansion with regional data</li>
              <li><strong>v2.1:</strong> Added currency conversion and economic analysis</li>
              <li><strong>v2.2:</strong> Enhanced accessibility and mobile responsiveness</li>
              <li><strong>v3.0:</strong> Economic analysis available on saved scenarios</li>
              <li><strong>v3.1:</strong> Pages reorganized and saved scenarios are printable</li>
              <li><strong>v3.2:</strong> UI complete redesigned</li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default ResourcesPage;
