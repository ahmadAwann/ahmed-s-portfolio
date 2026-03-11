import { useState } from 'react';

const About = ({ onClose }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <style>{`
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .about-popup {
          animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes slideIn {
          0% {
            transform: scale(0.95) rotateX(10deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        .scanline-about {
          animation: scanlines 4s linear infinite;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(168, 85, 247, 0.2);
          pointer-events: none;
        }
      `}</style>
      <div 
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ 
          background: 'rgba(0, 0, 0, 0.7)', 
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}
        onClick={onClose}
      >
        <div 
          className="rounded-4 p-3 shadow-lg about-popup"
          style={{ 
            maxWidth: '750px', 
            width: '90%',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="scanline-about"></div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 
              className="mb-0"
              style={{
                fontFamily: "'Courier New', monospace",
                color: '#a855f7',
                textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                fontSize: '1.3rem'
              }}
            >
              &lt;About Me /&gt;
            </h2>
            <button 
              className="btn-close btn-close-white btn-sm" 
              onClick={onClose}
              aria-label="Close"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.5))'
              }}
            ></button>
          </div>
          
          <p style={{
            color: '#e9d5ff',
            fontSize: '1rem',
            lineHeight: '1.8',
            marginBottom: '25px',
            textAlign: 'center',
            fontFamily: "'Segoe UI', sans-serif"
          }}>
            Passionate Computer Science student with a diverse skill set spanning multiple domains of software development.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
              gap: '12px'
            }
          }}>
            <div
              style={{
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                background: hoveredCard === 'fullstack' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)',
                border: '2px solid ' + (hoveredCard === 'fullstack' ? '#a855f7' : 'rgba(168, 85, 247, 0.3)'),
                cursor: 'pointer',
                transform: hoveredCard === 'fullstack' ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'fullstack' ? '0 8px 20px rgba(168, 85, 247, 0.3)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard('fullstack')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <i className="bi bi-laptop" style={{ fontSize: '2.5rem', color: '#a855f7', marginBottom: '10px', display: 'block' }}></i>
              <h5 style={{ color: '#c084fc', fontFamily: "'Courier New', monospace", marginBottom: '10px', fontSize: '0.95rem' }}>Full Stack Developer</h5>
              <p style={{ color: '#c084fc', fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>Building modern web applications with React, Node.js, and databases</p>
            </div>
            
            <div
              style={{
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                background: hoveredCard === 'mobile' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)',
                border: '2px solid ' + (hoveredCard === 'mobile' ? '#a855f7' : 'rgba(168, 85, 247, 0.3)'),
                cursor: 'pointer',
                transform: hoveredCard === 'mobile' ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'mobile' ? '0 8px 20px rgba(168, 85, 247, 0.3)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard('mobile')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <i className="bi bi-phone" style={{ fontSize: '2.5rem', color: '#a855f7', marginBottom: '10px', display: 'block' }}></i>
              <h5 style={{ color: '#c084fc', fontFamily: "'Courier New', monospace", marginBottom: '10px', fontSize: '0.95rem' }}>Mobile Developer</h5>
              <p style={{ color: '#c084fc', fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>Creating Android apps with Java and cross-platform apps with Flutter</p>
            </div>
            
            <div
              style={{
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                background: hoveredCard === 'tech' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)',
                border: '2px solid ' + (hoveredCard === 'tech' ? '#a855f7' : 'rgba(168, 85, 247, 0.3)'),
                cursor: 'pointer',
                transform: hoveredCard === 'tech' ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hoveredCard === 'tech' ? '0 8px 20px rgba(168, 85, 247, 0.3)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard('tech')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <i className="bi bi-shield-check" style={{ fontSize: '2.5rem', color: '#a855f7', marginBottom: '10px', display: 'block' }}></i>
              <h5 style={{ color: '#c084fc', fontFamily: "'Courier New', monospace", marginBottom: '10px', fontSize: '0.95rem' }}>Tech Enthusiast</h5>
              <p style={{ color: '#c084fc', fontSize: '0.85rem', opacity: 0.8, margin: 0 }}>Exploring AI/ML, Cybersecurity, and 3D Web Development</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
