import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene3D from './Scene3D';
import NavigationMenu from './NavigationMenu';
import About from './About';

const CameraAnimator = ({ orbitControlsRef }) => {
  const hasAnimated = useRef(false);

  useFrame(({ camera }) => {
    if (orbitControlsRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      
      // Start position (right side)
      const startPos = { x: 15, y: 1.43, z: 6.5 };
      // End position (default)
      const endPos = { x: 7.5, y: 1.43, z: 6.5 };
      
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : -1 + (4 - 2 * progress) * progress;

        const newX = startPos.x + (endPos.x - startPos.x) * easeProgress;
        const newY = startPos.y + (endPos.y - startPos.y) * easeProgress;
        const newZ = startPos.z + (endPos.z - startPos.z) * easeProgress;

        camera.position.set(newX, newY, newZ);
        orbitControlsRef.current.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  });

  return null;
};

const Hero = ({ onNavigate, currentSection, onShowContact }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showCoords, setShowCoords] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [resetHovered, setResetHovered] = useState(false);
  const orbitControlsRef = useRef();

  const handleScreenClick = () => {
    setShowMenu(true);
  };

  const handleNavigate = (section) => {
    if (section === 'about') {
      setShowMenu(false);
      setShowAbout(true);
    } else if (section === 'contact') {
      setShowMenu(false);
      onShowContact();
    } else {
      setShowMenu(false);
      onNavigate(section);
    }
  };

  const resetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };

  if (currentSection !== 'home') {
    return null;
  }
  

  return (
    <section id="home" className="position-fixed top-0 start-0 w-100 h-100" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.2rem !important;
            line-height: 1.1 !important;
          }
          .hero-title {
            font-size: 0.9rem !important;
          }
          .hero-description {
            font-size: 0.75rem !important;
            line-height: 1.4 !important;
            max-width: 100% !important;
          }
          .hero-left-panel {
            width: 40% !important;
            padding: 0 20px !important;
          }
          .hero-social-icons a {
            font-size: 1.3rem !important;
          }
        }
        @media (max-width: 600px) {
          .hero-name {
            font-size: 1.8rem !important;
            line-height: 1 !important;
          }
          .hero-title {
            font-size: 0.8rem !important;
            margin-bottom: 0.5rem !important;
          }
          .hero-description {
            font-size: 0.7rem !important;
            line-height: 1.3 !important;
          }
          .hero-left-panel {
            width: 35% !important;
            padding: 0 15px !important;
          }
          .hero-social-icons a {
            font-size: 1.1rem !important;
          }
        }
        @media (max-height: 600px) {
          .hero-name {
            font-size: 1.8rem !important;
            line-height: 1 !important;
            margin-bottom: 0.5rem !important;
          }
          .hero-title {
            font-size: 0.8rem !important;
            margin-bottom: 0.5rem !important;
          }
          .hero-description {
            font-size: 0.7rem !important;
            line-height: 1.3 !important;
          }
          .hero-left-panel {
            padding: 0 15px !important;
          }
          .hero-social-icons a {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
      <Canvas 
        camera={{ position: [15, 1.43, 6.5], fov: 50 }}
        style={{ width: '100%', height: '100%', display: 'block', background: 'linear-gradient(to bottom, #1e293b, #0f172a)' }}
        onCreated={({ camera }) => {
          console.log('Initial Camera Position:', camera.position.toArray());
        }}
      >
        <Scene3D onScreenClick={handleScreenClick} showCoords={showCoords} />
        <CameraAnimator orbitControlsRef={orbitControlsRef} />
        <OrbitControls 
          ref={orbitControlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={9.2}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Reset Camera Button */}
      <div
        className="position-absolute top-0 end-0 m-3"
        style={{
          zIndex: 10,
          pointerEvents: 'auto'
        }}
        onMouseEnter={() => setResetHovered(true)}
        onMouseLeave={() => setResetHovered(false)}
      >
        <button
          onClick={resetCamera}
          style={{
            background: 'none',
            border: 'none',
            color: resetHovered ? '#c084fc' : 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            fontFamily: "'Courier New', monospace",
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transform: resetHovered ? 'scale(1.3)' : 'scale(1)',
            textShadow: resetHovered ? '0 0 20px rgba(192, 132, 252, 0.8), 5px 5px 15px rgba(168, 85, 247, 0.4)' : '0 0 10px rgba(168, 85, 247, 0.5)'
          }}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
      </div>
      
      {/* Coordinate Helper */}
      {showCoords && (
        <div 
          className="position-absolute top-0 start-0 m-3 p-3 bg-dark text-white rounded"
          style={{ zIndex: 10, fontSize: '0.8rem', fontFamily: 'monospace', display: 'none' }}
        >
          <div className="mb-2">
            <strong>Instructions:</strong>
          </div>
          <div>1. Drag to find the perfect view of PC</div>
          <div>2. Check browser console (F12)</div>
          <div>3. Copy Camera & Target values</div>
          <div>4. Tell me those numbers</div>
          <button 
            className="btn btn-sm btn-primary mt-2"
            onClick={() => setShowCoords(false)}
          >
            Hide Helper
          </button>
        </div>
      )}
      
      {/* Left side panel with name and info */}
      <div 
        className="hero-left-panel position-absolute top-0 start-0 h-100 d-flex align-items-center"
        style={{ 
          zIndex: 10, 
          width: '40%',
          background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.95) 0%, rgba(30, 41, 59, 0.7) 70%, transparent 100%)',
          padding: '0 60px'
        }}
      >
        <div>
          <h1 
            className="hero-name mb-3"
            style={{ 
              fontSize: '4.5rem',
              fontFamily: "'Courier New', monospace",
              fontWeight: 'bold',
              color: '#a855f7',
              textShadow: `
                0 0 2px #a855f7,
                0 0 4px #8b5cf6
              `,
              letterSpacing: '0.05em',
              lineHeight: '1.2'
            }}
          >
            AHMED<br/>MUNIR
          </h1>
          <h3 
            className="hero-title mb-4"
            style={{ 
              color: '#c084fc',
              fontFamily: "'Courier New', monospace",
              fontSize: '1.5rem',
              textShadow: '0 0 10px rgba(192, 132, 252, 0.5)'
            }}
          >
            &lt;Computer Science Student /&gt;
          </h3>
          <p 
            className="hero-description"
            style={{ 
              color: '#e9d5ff',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '450px',
              fontFamily: "'Segoe UI', sans-serif",
              margin: 0
            }}
          >
            Passionate developer with expertise in full-stack web development, mobile applications, 
            and emerging technologies. From building terminal-based games in C to creating immersive 
            3D web experiences, I transform ideas into reality through code. Currently exploring 
            AI/ML, cybersecurity, and pushing the boundaries of what's possible on the web.
          </p>
        </div>
      </div>
      
      {/* Right side - Social Links with 3D hover effect */}
      <div 
        className="hero-social-icons position-absolute top-50 end-0 translate-middle-y pe-4"
        style={{ zIndex: 10, perspective: '1000px' }}
      >
        <div className="d-flex flex-column gap-4">
          <a 
            href="https://github.com/ahmadAwann" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
            style={{ 
              fontSize: '2rem',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: hoveredIcon === 'github' ? '#c084fc' : 'white',
              transform: hoveredIcon === 'github' ? 'scale(1.3) rotateY(-20deg) rotateX(10deg)' : 'scale(1)',
              textShadow: hoveredIcon === 'github' ? '0 0 20px rgba(192, 132, 252, 0.8), 5px 5px 15px rgba(168, 85, 247, 0.4)' : '0 0 10px rgba(168, 85, 247, 0.5)',
              display: 'inline-block',
              '@media (max-width: 768px)': {
                fontSize: '1.5rem'
              }
            }}
            onMouseEnter={() => setHoveredIcon('github')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/ahmad-05346a2aa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
            style={{ 
              fontSize: '2rem',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: hoveredIcon === 'linkedin' ? '#06b6d4' : 'white',
              transform: hoveredIcon === 'linkedin' ? 'scale(1.3) rotateY(-20deg) rotateX(10deg)' : 'scale(1)',
              textShadow: hoveredIcon === 'linkedin' ? '0 0 20px rgba(6, 182, 212, 0.8), 5px 5px 15px rgba(6, 182, 212, 0.4)' : '0 0 10px rgba(168, 85, 247, 0.5)',
              display: 'inline-block',
              '@media (max-width: 768px)': {
                fontSize: '1.5rem'
              }
            }}
            onMouseEnter={() => setHoveredIcon('linkedin')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a 
            href="mailto:ahmadmuniro280@gmail.com"
            className="text-white text-decoration-none"
            style={{ 
              fontSize: '2rem',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: hoveredIcon === 'email' ? '#ec4899' : 'white',
              transform: hoveredIcon === 'email' ? 'scale(1.3) rotateY(-20deg) rotateX(10deg)' : 'scale(1)',
              textShadow: hoveredIcon === 'email' ? '0 0 20px rgba(236, 72, 153, 0.8), 5px 5px 15px rgba(236, 72, 153, 0.4)' : '0 0 10px rgba(168, 85, 247, 0.5)',
              display: 'inline-block',
              '@media (max-width: 768px)': {
                fontSize: '1.5rem'
              }
            }}
            onMouseEnter={() => setHoveredIcon('email')}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <i className="bi bi-envelope-fill"></i>
          </a>
        </div>
      </div>

      {showMenu && <NavigationMenu onClose={() => setShowMenu(false)} onNavigate={handleNavigate} />}
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      
      {/* Instructions overlay */}
      {!showMenu && !showAbout && (
        <div 
          className="position-absolute bottom-0 start-0 end-0 text-center text-white pb-4"
          style={{ zIndex: 10, pointerEvents: 'none' }}
        >
          <p className="mb-2">
            <i className="bi bi-mouse me-2"></i>
            Drag to rotate | Scroll to zoom
          </p>
          <p className="mb-0" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
            <i className="bi bi-cursor-fill me-2"></i>
            Click on the PC screen to explore
          </p>
        </div>
      )}
    </section>
  );
};

export default Hero;
