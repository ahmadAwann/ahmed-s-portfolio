import { useRef, Suspense, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function GamingRoom({ onScreenClick }) {
  const { scene } = useGLTF('/models/3d_gaming_room_with_gaming_setup_comp.glb');
  const modelRef = useRef();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const { camera, gl } = useThree();
  const screenMeshRef = useRef(null);

  // Find the screen mesh in the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Look for meshes that might be the screen (usually named "screen", "monitor", "display", etc.)
        const name = child.name.toLowerCase();
        if (name.includes('screen') || name.includes('monitor') || name.includes('display') || name.includes('plane')) {
          console.log('Found potential screen mesh:', child.name);
          screenMeshRef.current = child;
        }
      }
    });

    // If no screen found by name, use the first mesh as fallback
    if (!screenMeshRef.current) {
      scene.traverse((child) => {
        if (child.isMesh && !screenMeshRef.current) {
          screenMeshRef.current = child;
        }
      });
    }
  }, [scene]);

  useEffect(() => {
    const handleCanvasClick = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      mouseRef.current.set(x, y);
      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      // Check if ray intersects with the entire model
      const intersects = raycasterRef.current.intersectObject(modelRef.current, true);
      
      if (intersects.length > 0) {
        const hit = intersects[0];
        console.log('Clicked on model:', hit.object.name);
        console.log('Click point:', hit.point);
        
        // More lenient bounds based on your coordinates
        const isOnScreen = (
          hit.point.x > -6.5 && hit.point.x < 0.5 && 
          hit.point.y > -3 && hit.point.y < 1.5 &&
          hit.point.z > -8.5 && hit.point.z < -7
        );
        
        console.log('Is on screen bounds?', isOnScreen);
        
        if (isOnScreen) {
          console.log('✓ Clicked on screen area! Opening popup...');
          onScreenClick();
        }
      }
    };

    gl.domElement.addEventListener('click', handleCanvasClick);
    return () => gl.domElement.removeEventListener('click', handleCanvasClick);
  }, [gl, camera, onScreenClick]);

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={2} position={[0, -8, 0]} />
    </group>
  );
}

function Scene3D({ onScreenClick }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <spotLight position={[0, 5, 0]} angle={0.3} intensity={0.8} />
      <Suspense fallback={null}>
        <GamingRoom onScreenClick={onScreenClick} />
      </Suspense>
    </>
  );
}

export default Scene3D;
