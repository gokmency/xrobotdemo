import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';

const RobotModel = ({ ...props }) => {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) * 0.1;
  });

  return (
    <group ref={group} {...props}>
      {/* Body */}
      <Box args={[1, 1.5, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
          emissive="#00F0FF"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Head */}
      <Sphere args={[0.3]} position={[0, 1.1, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
          emissive="#00F0FF"
          emissiveIntensity={0.2}
        />
      </Sphere>

      {/* Arms */}
      <Cylinder args={[0.1, 0.1, 0.8]} position={[0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.8]} position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>

      {/* Legs */}
      <Cylinder args={[0.15, 0.15, 1]} position={[0.3, -1.25, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 1]} position={[-0.3, -1.25, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
    </group>
  );
};

export default RobotModel;
