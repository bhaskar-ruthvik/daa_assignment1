import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { SphereGeometry, MeshStandardMaterial } from 'three';

function Sphere() {
  const sphereRef = useRef();

  useFrame(() => {
    sphereRef.current.rotation.x += 0.01;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 1 }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={sphereRef} position={[1,0,0]}>
        <SphereGeometry args={[1, 64, 64]} />
        <MeshStandardMaterial color="lightblue" />
      </mesh>
    </Canvas>
  );
}

export default Sphere;
