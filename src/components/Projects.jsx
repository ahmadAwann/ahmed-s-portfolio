import { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const GalaxyModel = () => {
  const { scene } = useGLTF('/models/need_some_space.glb');
  return (
    <>
      <primitive object={scene} scale={15} position={[-35, -22, 0]} rotation={[0, 0, 0]} />
    </>
  );
};

const CameraController = ({ cameraAngle, orbitControlsRef }) => {
  useFrame(({ camera }) => {
    if (orbitControlsRef.current) {
      const radius = 14.5;
      const centerX = -18;
      const centerY = -8;
      const centerZ = 0;

      const newX = centerX + radius * Math.cos(cameraAngle);
      const newZ = centerZ + radius * Math.sin(cameraAngle);

      camera.position.set(newX, 2.38, newZ);
      orbitControlsRef.current.target.set(centerX, centerY, centerZ);
      orbitControlsRef.current.update();
    }
  });

  return (
    <OrbitControls 
      ref={orbitControlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      autoRotate={false}
      minDistance={5}
      maxDistance={100}
      target={[-18, -8, 0]}
      onChange={(event) => {
        if (event && event.target && event.target.object) {
          const camera = event.target.object;
          console.log('Camera Position:', camera.position.toArray());
          console.log('Target:', event.target.target.toArray());
        }
      }}
    />
  );
};

const Projects = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [cameraAngle, setCameraAngle] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);
  const orbitControlsRef = useRef();

  useEffect(() => {
    // Animate camera on mount by animating the angle
    const startTime = Date.now();
    const duration = 2000;
    const startAngle = 0.5; // Start angle (right side)
    const endAngle = 0; // End angle (center)

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

      const newAngle = startAngle + (endAngle - startAngle) * easeProgress;
      setCameraAngle(newAngle);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCameraAngle(endAngle);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: "Terminal Ludo & Tic-Tac-Toe",
      category: "C Programming",
      description: "Classic games built with C, featuring game logic and terminal UI",
      tech: ["C", "Terminal"],
      icon: "bi-terminal-fill",
      github: "https://github.com/yourusername/terminal-games"
    },
    {
      title: "GUI Ludo Game",
      category: "Java",
      description: "Interactive Ludo game with Java Swing GUI and OOP principles",
      tech: ["Java", "Swing", "OOP"],
      icon: "bi-controller",
      github: "https://github.com/yourusername/gui-ludo"
    },
    {
      title: "Maze Solver",
      category: "Java",
      description: "Pathfinding application using BFS and DFS algorithms",
      tech: ["Java", "Data Structures", "Algorithms"],
      icon: "bi-diagram-3",
      github: "https://github.com/yourusername/maze-solver"
    },
    {
      title: "Weather App",
      category: "Web Development",
      description: "Real-time weather application with API integration",
      tech: ["React", "Node.js", "API"],
      icon: "bi-cloud-sun",
      github: "https://github.com/yourusername/weather-app"
    },
    {
      title: "Student Management System",
      category: "Web Development",
      description: "Full-stack application for managing student records",
      tech: ["React", "Node.js", "MongoDB"],
      icon: "bi-person-workspace",
      private: true
    },
    {
      title: "College Management System",
      category: "Web Development",
      description: "Comprehensive system for college administration",
      tech: ["PHP", "MySQL", "Bootstrap"],
      icon: "bi-building",
      private: true
    },
    {
      title: "Calculator App",
      category: "Mobile",
      description: "Android calculator with modern UI and functionality",
      tech: ["Java", "Android"],
      icon: "bi-calculator",
      github: "https://github.com/yourusername/calculator-app"
    },
    {
      title: "Flutter Applications",
      category: "Mobile",
      description: "Cross-platform mobile apps built with Flutter",
      tech: ["Flutter", "Dart"],
      icon: "bi-phone-fill",
      github: "https://github.com/yourusername/flutter-apps"
    }
  ];

  const playSound = () => {
    const audio = new Audio('/sounds/move_journey.wav');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Sound play failed:', err));
  };

  const animateCamera = (targetAngle) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const startAngle = cameraAngle;
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;

      const newAngle = startAngle + (targetAngle - startAngle) * easeProgress;
      setCameraAngle(newAngle);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handlePrev = () => {
    playSound();
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    animateCamera(cameraAngle + Math.PI / 4);
  };

  const handleNext = () => {
    playSound();
    setDirection('next');
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    animateCamera(cameraAngle - Math.PI / 4);
  };

  const currentProject = projects[currentIndex];

  return (
    <section id="projects" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(30, 41, 59, 0.8) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes slideInNext {
          0% {
            transform: rotateY(-90deg) scale(0.5) translateX(100px);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg) scale(1) translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInPrev {
          0% {
            transform: rotateY(90deg) scale(0.5) translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg) scale(1) translateX(0);
            opacity: 1;
          }
        }
        .projects-card {
          animation: ${direction === 'next' ? 'slideInNext' : 'slideInPrev'} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          perspective: 1000px;
        }
        .arrow-btn {
          transition: all 0.3s ease;
        }
        .arrow-btn:hover {
          transform: scale(1.2);
          color: #a855f7;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
        }
        .arrow-btn:active {
          transform: scale(0.95);
        }
        @media (max-width: 768px) {
          .projects-title {
            font-size: 1.2rem !important;
          }
          .projects-card {
            max-width: 85% !important;
            padding: 20px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            font-size: 0.85rem !important;
          }
          .projects-card h3 {
            font-size: 1.1rem !important;
          }
          .projects-card p {
            font-size: 0.8rem !important;
            line-height: 1.4 !important;
          }
          .arrow-btn {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      {/* 3D Background - Layer 0 */}
      <Canvas 
        camera={{ position: [15, 2.38, -11.06], fov: 75 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
        onCreated={({ camera, gl }) => {
          gl.setClearColor(0x000000, 0.1);
          console.log('Initial Camera Position:', camera.position.toArray());
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, 10, -10]} intensity={0.8} />
        <Suspense fallback={null}>
          <GalaxyModel />
        </Suspense>
        <CameraController cameraAngle={cameraAngle} orbitControlsRef={orbitControlsRef} />
      </Canvas>

      {/* Overlay to darken background - Layer 1 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      {/* Background gradient orbs - Layer 0 */}
      <div style={{
        position: 'fixed',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.6)',
          border: '2px solid rgba(168, 85, 247, 0.5)',
          color: '#a855f7',
          padding: '10px 20px',
          borderRadius: '8px',
          fontFamily: "'Courier New', monospace",
          fontSize: '1rem',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(168, 85, 247, 0.2)';
          e.target.style.borderColor = '#a855f7';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 0, 0, 0.6)';
          e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        ← Back
      </button>

      <div style={{ position: 'fixed', zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', pointerEvents: 'none' }}>
        <div style={{ width: '100%', maxWidth: '900px', pointerEvents: 'auto' }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontFamily: "'Courier New', monospace",
              color: '#a855f7',
              textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
              fontSize: '2.5rem',
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '10px 20px',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(168, 85, 247, 0.3)',
              display: 'block',
              margin: 0,
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }} className="projects-title">
              &lt;My Projects /&gt;
            </h2>
          </div>

          {/* Carousel Container */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',
            position: 'relative'
          }}>
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="arrow-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '3rem',
                color: '#c084fc',
                cursor: 'pointer',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Card */}
            <div key={currentIndex} className="projects-card" style={{
              flex: 1,
              maxWidth: '500px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '@media (max-width: 768px)': {
                maxWidth: '90%',
                padding: '20px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }
            }}>
              {/* Glow effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                pointerEvents: 'none'
              }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Category Badge */}
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.5)',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    color: '#a855f7',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {currentProject.category}
                  </span>
                </div>

                {/* Icon and Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <i className={`${currentProject.icon}`} style={{
                    fontSize: '2.5rem',
                    color: '#a855f7',
                    textShadow: '0 0 15px rgba(168, 85, 247, 0.6)'
                  }}></i>
                  <h3 style={{
                    color: '#c084fc',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '1.8rem',
                    margin: 0
                  }}>
                    {currentProject.title}
                  </h3>
                </div>

                {/* Description */}
                <p style={{
                  color: '#e9d5ff',
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  marginBottom: '25px',
                  fontFamily: "'Segoe UI', sans-serif"
                }}>
                  {currentProject.description}
                </p>

                {/* Tech Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
                  {currentProject.tech.map((tech, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#c084fc',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontFamily: "'Courier New', monospace"
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div>
                  {currentProject.github ? (
                    <a 
                      href={currentProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{
                        display: 'inline-block',
                        background: 'rgba(168, 85, 247, 0.2)',
                        border: '2px solid rgba(168, 85, 247, 0.5)',
                        color: '#a855f7',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontFamily: "'Courier New', monospace",
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(168, 85, 247, 0.3)';
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                        e.target.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="bi bi-github" style={{ marginRight: '8px' }}></i>View Code
                    </a>
                  ) : currentProject.private ? (
                    <button 
                      disabled
                      style={{
                        display: 'inline-block',
                        background: 'rgba(100, 100, 100, 0.2)',
                        border: '2px solid rgba(100, 100, 100, 0.5)',
                        color: '#888',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontFamily: "'Courier New', monospace",
                        fontSize: '0.95rem',
                        cursor: 'not-allowed'
                      }}
                    >
                      <i className="bi bi-lock-fill" style={{ marginRight: '8px' }}></i>Private
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="arrow-btn"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '3rem',
                color: '#c084fc',
                cursor: 'pointer',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px'
          }}>
            {projects.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: idx === currentIndex ? '30px' : '10px',
                  height: '10px',
                  background: idx === currentIndex ? '#a855f7' : 'rgba(168, 85, 247, 0.3)',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: idx === currentIndex ? '0 0 15px rgba(168, 85, 247, 0.6)' : 'none'
                }}
                onClick={() => {
                  playSound();
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  const angleDiff = (idx - currentIndex) * (Math.PI / 4);
                  animateCamera(cameraAngle + angleDiff);
                  setCurrentIndex(idx);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
