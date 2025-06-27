'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

function Panorama({ src }: { src: string }) {
  const texture = useLoader(TextureLoader, src);

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={1} />
    </mesh>
  );
}

export default function PanoramaScene({ src }: { src: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
      <Panorama src={src} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
