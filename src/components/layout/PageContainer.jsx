import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';

const PageContainer = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="flex-grow-1 py-4">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageContainer;
