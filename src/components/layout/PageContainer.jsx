import NavBar from './NavBar';

const PageContainer = ({ children, backgroundImage, backgroundAlt, fluid = false }) => {
  const containerStyle = {
    backgroundImage: backgroundImage ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle = {
    flex: 1,
    width: '100%',
    maxWidth: fluid ? '100%' : '1400px',
    margin: '0 auto',
    padding: fluid ? '1.5rem 3rem' : '1.5rem 2rem'
  };

  return (
    <div
      style={containerStyle}
      role="img"
      aria-label={backgroundAlt || "Oil and gas industry background"}
    >
      <NavBar />
      <main style={contentStyle}>
        {children}
      </main>
    </div>
  );
};

export default PageContainer;
