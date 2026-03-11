import { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Skill data with PNG icons
const skillsData = [
  {
    name: "React.js",
    category: "Frontend",
    description: "Modern UI library",
    experience: "Advanced",
    projects: ["Portfolio Website", "Weather App", "Student Management System"],
    color: "#61dafb",
    iconPath: "/icons/react.png"
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime",
    experience: "Advanced",
    projects: ["Weather App", "Student Management System", "REST APIs"],
    color: "#68a063",
    iconPath: "/icons/nodejs.png"
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "NoSQL database",
    experience: "Intermediate",
    projects: ["Student Management System", "College Management System"],
    color: "#13aa52",
    iconPath: "/icons/mongo-db.png"
  },
  {
    name: "Java",
    category: "Backend",
    description: "OOP language",
    experience: "Advanced",
    projects: ["GUI Ludo Game", "Maze Solver", "Android Apps"],
    color: "#007396",
    iconPath: "/icons/java.png"
  },
  {
    name: "Flutter",
    category: "Mobile",
    description: "Cross-platform mobile",
    experience: "Intermediate",
    projects: ["Flutter Applications"],
    color: "#02569b",
    iconPath: "/icons/flutter.png"
  },
  {
    name: "MySQL",
    category: "Database",
    description: "Relational database",
    experience: "Advanced",
    projects: ["College Management System", "Web Applications"],
    color: "#00758f",
    iconPath: "/icons/mysql.png"
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Web scripting language",
    experience: "Advanced",
    projects: ["Portfolio Website", "Weather App", "Web Development"],
    color: "#f7df1e",
    iconPath: "/icons/javascript.png"
  },
  {
    name: "Android",
    category: "Mobile",
    description: "Mobile development",
    experience: "Intermediate",
    projects: ["Calculator App", "Android Applications"],
    color: "#3ddc84",
    iconPath: "/icons/android.png"
  },
  {
    name: "PHP",
    category: "Backend",
    description: "Server-side language",
    experience: "Intermediate",
    projects: ["College Management System", "Web Applications"],
    color: "#777bb4",
    iconPath: "/icons/php.png"
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    description: "CSS framework",
    experience: "Advanced",
    projects: ["College Management System", "Web Applications"],
    color: "#7952b3",
    iconPath: "/icons/bootstrap-framework-logo.png"
  },
  {
    name: "Three.js",
    category: "3D",
    description: "3D graphics library",
    experience: "Intermediate",
    projects: ["Portfolio Website", "3D Web Development"],
    color: "#000000",
    iconPath: "/icons/Three.js.png"
  },
  {
    name: "AI/ML",
    category: "Emerging",
    description: "Artificial Intelligence",
    experience: "Beginner",
    projects: ["Learning & Exploration"],
    color: "#ff6b6b",
    iconPath: "/icons/Ai-Chip.png"
  }
];

// Skill Icon Component with PNG Texture
const SkillIcon = ({ skill, index, totalSkills, hoveredSkill, setHoveredSkill, setSelectedSkill }) => {
  const meshRef = useRef();
  const mainMeshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const textureRef = useRef(null);
  const materialRef = useRef(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  
  // Calculate orbit parameters
  const orbitRadius = 8;
  const angle = (index / totalSkills) * Math.PI * 2;
  const speed = 0.3;
  
  // Load texture from PNG
  useEffect(() => {
    if (skill.iconPath && !textureRef.current) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        skill.iconPath,
        (texture) => {
          textureRef.current = texture;
          setTextureLoaded(true);
          if (materialRef.current) {
            materialRef.current.map = texture;
            materialRef.current.needsUpdate = true;
          }
        },
        undefined,
        (error) => {
          console.warn(`Failed to load texture: ${skill.iconPath}`, error);
          setTextureLoaded(false);
        }
      );
    }
  }, [skill.iconPath]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed;
      const currentAngle = angle + t;
      
      meshRef.current.position.x = Math.cos(currentAngle) * orbitRadius;
      meshRef.current.position.z = Math.sin(currentAngle) * orbitRadius;
      
      // Gentle rotation
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
      
      // Scale based on hover
      const targetScale = hovered || hoveredSkill === index ? 1.3 : 1;
      meshRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        0.1
      );
    }
  });
  
  return (
    <group
      ref={meshRef}
      position={[Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius]}
    >
      {/* 3D Box with PNG texture or fallback color */}
      <mesh
        ref={mainMeshRef}
        onPointerEnter={() => {
          setHovered(true);
          setHoveredSkill(index);
        }}
        onPointerLeave={() => {
          setHovered(false);
          setHoveredSkill(null);
        }}
        onClick={() => setSelectedSkill(skill)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          ref={materialRef}
          map={textureRef.current}
          color={textureLoaded ? "#ffffff" : skill.color}
          emissive={hovered || hoveredSkill === index ? skill.color : "#000000"}
          emissiveIntensity={hovered || hoveredSkill === index ? 0.6 : 0.2}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      
      {/* Glow effect on hover - no pointer events */}
      {(hovered || hoveredSkill === index) && (
        <mesh scale={1.35} raycast={() => null}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial
            color={skill.color}
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
      
      {/* Orbit line - no pointer events */}
      <line raycast={() => null}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={64}
            array={new Float32Array(
              Array.from({ length: 64 }, (_, i) => {
                const a = (i / 64) * Math.PI * 2;
                return [
                  Math.cos(a) * orbitRadius,
                  0,
                  Math.sin(a) * orbitRadius
                ];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={skill.color} transparent opacity={0.2} />
      </line>
    </group>
  );
};

// Center Developer Object
const CenterObject = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });
  
  return (
    <group ref={meshRef}>
      {/* Center cube representing developer */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow sphere around center */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {/* Inner rotating ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
};

// Tooltip Component
const Tooltip = ({ skill, position }) => {
  if (!skill) return null;
  
  return (
    <div style={{
      position: 'fixed',
      left: `${position.x}px`,
      top: `${position.y}px`,
      background: 'rgba(0, 0, 0, 0.95)',
      border: `2px solid ${skill.color}`,
      borderRadius: '12px',
      padding: '12px 16px',
      color: '#fff',
      fontFamily: "'Courier New', monospace",
      fontSize: '0.9rem',
      zIndex: 50,
      pointerEvents: 'none',
      boxShadow: `0 0 20px ${skill.color}40`,
      backdropFilter: 'blur(10px)',
      transform: 'translate(-50%, -120%)',
      whiteSpace: 'nowrap'
    }}>
      <div style={{ fontWeight: 'bold', color: skill.color }}>{skill.name}</div>
      <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{skill.description}</div>
    </div>
  );
};

// Information Card Component
const InfoCard = ({ skill, onClose }) => {
  if (!skill) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)',
      border: `2px solid ${skill.color}`,
      borderRadius: '16px',
      padding: '40px',
      color: '#fff',
      fontFamily: "'Courier New', monospace",
      zIndex: 100,
      maxWidth: '500px',
      width: '90%',
      boxShadow: `0 0 60px ${skill.color}40, inset 0 0 30px ${skill.color}10`,
      backdropFilter: 'blur(10px)',
      animation: 'slideUp 0.4s ease-out'
    }}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
      
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'none',
          border: 'none',
          color: skill.color,
          fontSize: '1.5rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        ✕
      </button>
      
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          color: skill.color,
          fontSize: '1.8rem',
          margin: '0 0 10px 0',
          textShadow: `0 0 10px ${skill.color}80`
        }}>
          {skill.name}
        </h3>
        <div style={{
          display: 'flex',
          gap: '15px',
          fontSize: '0.9rem',
          color: '#aaa'
        }}>
          <span>Category: <span style={{ color: skill.color }}>{skill.category}</span></span>
          <span>Level: <span style={{ color: skill.color }}>{skill.experience}</span></span>
        </div>
      </div>
      
      {/* Description */}
      <p style={{
        color: '#e9d5ff',
        lineHeight: '1.6',
        marginBottom: '20px',
        fontSize: '0.95rem'
      }}>
        {skill.description}
      </p>
      
      {/* Experience Level */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.9rem'
        }}>
          <span>Experience Level</span>
          <span style={{ color: skill.color }}>{skill.experience}</span>
        </div>
      </div>
      
      {/* Projects */}
      <div>
        <h4 style={{
          color: skill.color,
          fontSize: '1rem',
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Projects Using This Skill
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {skill.projects.map((project, idx) => (
            <li key={idx} style={{
              color: '#c084fc',
              fontSize: '0.9rem',
              paddingLeft: '15px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: skill.color
              }}>▸</span>
              {project}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main Skills Component
const Skills = ({ onNavigate }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="skills" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(30, 41, 59, 0.9) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
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

      {/* Title */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
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
          margin: 0
        }}>
          &lt;My Skills /&gt;
        </h2>
      </div>

      {/* Instruction Text */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <p style={{
          fontFamily: "'Courier New', monospace",
          color: '#c084fc',
          fontSize: '0.9rem',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '8px 16px',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          margin: 0,
          letterSpacing: '0.5px',
          fontWeight: '500'
        }}>
          ▸ Click on any skill icon to explore details
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0.1);
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[0, 5, 10]} intensity={0.8} color="#a855f7" />
        
        <Suspense fallback={null}>
          <CenterObject />
          {skillsData.map((skill, index) => (
            <SkillIcon
              key={index}
              skill={skill}
              index={index}
              totalSkills={skillsData.length}
              hoveredSkill={hoveredSkill}
              setHoveredSkill={setHoveredSkill}
              setSelectedSkill={setSelectedSkill}
            />
          ))}
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
          minDistance={10}
          maxDistance={40}
        />
      </Canvas>

      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.2)',
        zIndex: 5,
        pointerEvents: 'none'
      }}></div>

      {/* Tooltip */}
      <Tooltip skill={skillsData[hoveredSkill]} position={tooltipPos} />

      {/* Info Card */}
      {selectedSkill && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 99,
              backdropFilter: 'blur(5px)',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedSkill(null)}
          />
          <InfoCard skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        </>
      )}
    </section>
  );
};

export default Skills;
