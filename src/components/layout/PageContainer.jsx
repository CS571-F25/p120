import NavBar from './NavBar';

const PageContainer = ({ children, backgroundImage, backgroundAlt, fluid = false }) => {
  // Fixed background layer - works on both desktop and mobile
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  };

  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const contentStyle = {
    flex: 1,
    width: '100%',
    maxWidth: fluid ? '100%' : '1400px',
    margin: '0 auto',
    padding: fluid ? '1.5rem 3rem' : '1.5rem 2rem'
  };

  return (
    <>
      {/* Fixed background that works on mobile */}
      <div
        style={backgroundStyle}
        role="img"
        aria-label={backgroundAlt || "Oil and gas industry background"}
      />
      <div style={containerStyle}>
        <NavBar />
        <main style={contentStyle}>
          {children}
        </main>
      </div>
    </>
  );
};

export default PageContainer;
