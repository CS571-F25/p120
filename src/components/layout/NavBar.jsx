import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import { FaHome, FaCalculator, FaChartLine, FaBook, FaOilCan } from 'react-icons/fa';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-0 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaOilCan className="me-2" aria-hidden="true" />
          <strong>WellWise</strong> Drilling Calculator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="me-1" aria-hidden="true" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/calculator">
              <FaCalculator className="me-1" aria-hidden="true" />
              Calculator
            </Nav.Link>
            <Nav.Link as={Link} to="/analysis">
              <FaChartLine className="me-1" aria-hidden="true" />
              Analysis
            </Nav.Link>
            <Nav.Link as={Link} to="/resources">
              <FaBook className="me-1" aria-hidden="true" />
              Resources
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
