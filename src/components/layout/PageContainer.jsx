import { Container } from 'react-bootstrap';
import NavBar from './NavBar';

const PageContainer = ({ children, backgroundImage, backgroundAlt }) => {
  const containerStyle = {
    backgroundImage: backgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={containerStyle}
      role="img"
      aria-label={backgroundAlt || "Oil and gas industry background"}
    >
      <NavBar />
      <Container className="flex-grow-1 py-4">
        {children}
      </Container>
    </div>
  );
};

export default PageContainer;
