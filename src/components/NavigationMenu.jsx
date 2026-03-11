import { useEffect } from 'react';

const NavigationMenu = ({ onClose, onNavigate }) => {
  const menuItems = [
    { name: 'About', icon: 'bi-person', section: 'about' },
    { name: 'Journey', icon: 'bi-map', section: 'journey' },
    { name: 'Projects', icon: 'bi-code-slash', section: 'projects' },
    { name: 'Skills', icon: 'bi-gear', section: 'skills' },
    { name: 'Contact', icon: 'bi-envelope', section: 'contact' }
  ];

  useEffect(() => {
    // Play hacking system sound with faster playback and low volume
    const audio = new Audio('/sounds/mixkit-high-tech-bleep-2521.wav');
    audio.volume = 0.3; // Low volume
    audio.playbackRate = 1.5; // Faster playback
    audio.play().catch(err => console.log('Audio play failed:', err));
  }, []);

  const playCloseSound = () => {
    const closeAudio = new Audio('/sounds/on_close.mp3');
    closeAudio.volume = 0.3;
    closeAudio.play().catch(err => console.log('Close audio play failed:', err));
  };

  const handleClose = () => {
    playCloseSound();
    onClose();
  };

  const handleNavClick = (section) => {
    playCloseSound();
    onNavigate(section);
  };

  return (
    <>
      <style>{`
        @keyframes hackingOpen {
          0% {
            transform: scale(0.3) rotateX(90deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.05) rotateX(0deg);
          }
          100% {
            transform: scale(1) rotateX(0deg);
            opacity: 1;
          }
        }
        @keyframes codeLines {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }
        @keyframes scanlines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes glitchBorder {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .hacker-popup {
          animation: hackingOpen 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          perspective: 1000px;
        }
        .hacker-popup {
          animation: hackingOpen 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), glitchBorder 0.3s ease-in-out;
        }
        .scanline {
          animation: scanlines 4s linear infinite;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(168, 85, 247, 0.2);
          pointer-events: none;
        }
        .code-line {
          animation: codeLines 0.5s ease-out forwards;
          overflow: hidden;
          white-space: nowrap;
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          color: rgba(168, 85, 247, 0.6);
          margin: 2px 0;
        }
        .code-line:nth-child(1) { animation-delay: 0.1s; }
        .code-line:nth-child(2) { animation-delay: 0.2s; }
        .code-line:nth-child(3) { animation-delay: 0.3s; }
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
          className="rounded-4 p-3 shadow-lg hacker-popup"
          style={{ 
            maxWidth: '380px', 
            width: '80%',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="scanline"></div>
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
              &lt;Navigation /&gt;
            </h2>
            <button 
              className="btn-close btn-close-white btn-sm" 
              onClick={handleClose}
              aria-label="Close"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.5))'
              }}
            ></button>
          </div>
          
          <div className="row g-2">
            {menuItems.map((item, index) => (
              <div key={index} className="col-6">
                <button
                  onClick={() => handleNavClick(item.section)}
                  className="w-100 py-2 d-flex flex-column align-items-center gap-1"
                  style={{ 
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                    color: '#c084fc',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                    e.target.style.borderColor = '#a855f7';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(168, 85, 247, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(168, 85, 247, 0.1)';
                    e.target.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <i className={`${item.icon}`} style={{ fontSize: '1.5rem' }}></i>
                  <span className="fw-semibold">{item.name}</span>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-2">
            <p className="small mb-0" style={{ color: '#c084fc', opacity: 0.7, fontSize: '0.75rem' }}>
              Click any section to explore my portfolio
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
