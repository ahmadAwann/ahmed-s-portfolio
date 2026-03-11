import { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const SciFiBar = () => {
  const { scene } = useGLTF('/models/sci-fi_bar.glb');
  return <primitive object={scene} scale={20} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
};

const CameraAnimator = ({ orbitControlsRef }) => {
  const hasAnimated = useRef(false);

  useFrame(({ camera }) => {
    if (orbitControlsRef.current && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startPos = { x: -15, y: 2.38, z: -11.06 };
      const endPos = { x: 0.84, y: 4.73, z: 13.98 };
      
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

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

const Journey = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const orbitControlsRef = useRef();

  const milestones = [
    {
      phase: "Phase 1",
      title: "Programming Fundamentals",
      description: "Learned C programming and built terminal-based games",
      projects: ["Ludo Game", "Tic-Tac-Toe"],
      icon: "bi-terminal"
    },
    {
      phase: "Phase 2",
      title: "Java & OOP",
      description: "Mastered Java, OOP concepts, and Data Structures",
      projects: ["GUI Ludo Game (Swing)", "Maze Solver (BFS/DFS)"],
      icon: "bi-cup-hot"
    },
    {
      phase: "Phase 3",
      title: "Full Stack Web Development",
      description: "Built dynamic web applications with modern stack",
      projects: ["Weather App", "Student Management System", "College Management System"],
      icon: "bi-globe"
    },
    {
      phase: "Phase 4",
      title: "Mobile Development",
      description: "Android development with Java and Flutter",
      projects: ["Calculator App", "Flutter Applications"],
      icon: "bi-phone"
    },
    {
      phase: "Current",
      title: "Expanding Horizons",
      description: "Exploring AI/ML, Cybersecurity, and 3D Web Development",
      projects: ["Ongoing Learning"],
      icon: "bi-rocket-takeoff"
    }
  ];

  const playSound = () => {
    const audio = new Audio('/sounds/move_journey.wav');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Sound play failed:', err));
  };

  const handlePrev = () => {
    playSound();
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? milestones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playSound();
    setDirection('next');
    setCurrentIndex((prev) => (prev === milestones.length - 1 ? 0 : prev + 1));
  };

  const currentMilestone = milestones[currentIndex];

  return (
    <section id="journey" style={{
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
        .journey-card {
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
          .journey-title {
            font-size: 1.2rem !important;
          }
          .journey-card {
            max-width: 85% !important;
            padding: 20px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            font-size: 0.9rem !important;
          }
          .journey-card h3 {
            font-size: 1.2rem !important;
          }
          .journey-card p {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
          }
          .arrow-btn {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      {/* 3D Background - Layer 0 */}
      <Canvas 
        camera={{ position: [-15, 2.38, -11.06], fov: 50 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
        onCreated={({ camera }) => {
          console.log('Initial Camera Position:', camera.position.toArray());
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <SciFiBar />
        </Suspense>
        <CameraAnimator orbitControlsRef={orbitControlsRef} />
        <OrbitControls 
          ref={orbitControlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={5}
          maxDistance={50}
          target={[0, 0, 0]}
          onChange={(event) => {
            if (event && event.target && event.target.object) {
              const camera = event.target.object;
              console.log('Camera Position:', camera.position.toArray());
              console.log('Target:', event.target.target.toArray());
            }
          }}
        />
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
          backdropFilter: 'blur(10px)'
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
            }} className="journey-title">
              &lt;My Journey /&gt;
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
            <div key={currentIndex} className="journey-card" style={{
              flex: 1,
              maxWidth: '500px',
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '2px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 0 60px rgba(168, 85, 247, 0.3), inset 0 0 30px rgba(168, 85, 247, 0.1)',
              position: 'relative',
              overflow: 'hidden'
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
                {/* Phase Badge */}
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
                    {currentMilestone.phase}
                  </span>
                </div>

                {/* Icon and Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <i className={`${currentMilestone.icon}`} style={{
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
                    {currentMilestone.title}
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
                  {currentMilestone.description}
                </p>

                {/* Projects */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {currentMilestone.projects.map((project, idx) => (
                    <span key={idx} style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      color: '#c084fc',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontFamily: "'Courier New', monospace"
                    }}>
                      {project}
                    </span>
                  ))}
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
            {milestones.map((_, idx) => (
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

export default Journey;
