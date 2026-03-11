const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; 2026 Your Name. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="https://github.com/yourusername" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github fs-4"></i>
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-linkedin fs-4"></i>
            </a>
            <a href="mailto:your.email@example.com" className="text-white">
              <i className="bi bi-envelope-fill fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
