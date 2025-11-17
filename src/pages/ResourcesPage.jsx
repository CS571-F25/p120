import { Container, Card, Row, Col, Badge, Accordion } from 'react-bootstrap';
import PageContainer from '../components/layout/PageContainer';

const ResourcesPage = () => {
  return (
    <PageContainer>
      <Container>
        <div className="mb-4">
          <h1 className="display-5 fw-bold">Resources & Methodology</h1>
          <p className="lead text-muted">
            Learn about our calculation methodology and data sources
          </p>
        </div>

        <Row className="mb-4">
          <Col md={12}>
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Global Data Sources</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>North America</h6>
                    <ul>
                      <li>EIA (Energy Information Administration)</li>
                      <li>Baker Hughes Rig Count</li>
                      <li>SPE (Society of Petroleum Engineers) Papers</li>
                      <li>IHS Markit UCCI</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6>Middle East</h6>
                    <ul>
                      <li>OPEC Annual Statistical Bulletin 2024</li>
                      <li>OPEC Cost Studies</li>
                      <li>Regional regulatory data</li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h6>North Sea</h6>
                    <ul>
                      <li>UK OGA Wells Insight Database</li>
                      <li>Norwegian Petroleum Directorate</li>
                      <li>Regional cost indices</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h6>Asia-Pacific & Latin America</h6>
                    <ul>
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

        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">Calculation Methodology</h5>
          </Card.Header>
          <Card.Body>
            <h6>Base Cost Formula (SPE-170941-MS)</h6>
            <Card className="bg-light p-3 mb-3">
              <code>
                Total Cost = (Fixed Costs + Depth Costs + Rig Costs) × Regional Multiplier × Currency Rate
              </code>
            </Card>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Fixed Costs</Accordion.Header>
                <Accordion.Body>
                  <p>Base fixed costs include:</p>
                  <ul>
                    <li><strong>Onshore:</strong> $500,000 (permits, site preparation, infrastructure)</li>
                    <li><strong>Offshore:</strong> $2,000,000 (platform costs, marine logistics, regulatory)</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Depth Costs</Accordion.Header>
                <Accordion.Body>
                  <p>Cost per foot of depth:</p>
                  <ul>
                    <li><strong>Onshore:</strong> $150/foot (drilling, casing, cementing)</li>
                    <li><strong>Offshore:</strong> $400/foot (additional marine equipment, subsea completions)</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Rig Day Rates</Accordion.Header>
                <Accordion.Body>
                  <p>Daily rig costs vary by region and type:</p>
                  <Row>
                    <Col md={6}>
                      <h6>Onshore Rigs</h6>
                      <ul>
                        <li>Small: $10,000 - $15,000/day</li>
                        <li>Standard: $18,000 - $25,000/day</li>
                        <li>Premium: $28,000 - $35,000/day</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <h6>Offshore Rigs</h6>
                      <ul>
                        <li>Jackup: $55,000 - $120,000/day</li>
                        <li>Semisubmersible: $180,000 - $380,000/day</li>
                        <li>Drillship: $400,000 - $550,000/day</li>
                      </ul>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Regional Multipliers</Accordion.Header>
                <Accordion.Body>
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

        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">Economic Analysis Methodology</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>Net Present Value (NPV)</h6>
                <p className="small">
                  Calculated using a 10% discount rate over a 3-year production profile
                  with a typical decline curve (50% Year 1, 30% Year 2, 20% Year 3).
                </p>
              </Col>
              <Col md={6}>
                <h6>Break-Even Price</h6>
                <p className="small">
                  The oil price needed to recover all drilling costs and operating expenses,
                  accounting for 12.5% royalty and $15/barrel operating costs.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <h6>Return on Investment (ROI)</h6>
                <p className="small">
                  Total net revenue minus total cost, divided by total cost,
                  expressed as a percentage.
                </p>
              </Col>
              <Col md={6}>
                <h6>Payback Period</h6>
                <p className="small">
                  Time in months to recover the initial drilling investment
                  from production revenue.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-warning text-dark">
            <h5 className="mb-0">Important Disclaimers</h5>
          </Card.Header>
          <Card.Body>
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

        <Card className="shadow-sm">
          <Card.Header className="bg-dark text-white">
            <h5 className="mb-0">Version History</h5>
          </Card.Header>
          <Card.Body>
            <ul className="mb-0">
              <li><strong>v1.0:</strong> US-only calculator with basic features</li>
              <li><strong>v2.0:</strong> Global expansion with regional data</li>
              <li><strong>v2.1:</strong> Added currency conversion and economic analysis</li>
              <li><strong>v2.2:</strong> Enhanced accessibility and mobile responsiveness</li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default ResourcesPage;
