import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';

/**
 * Mode exploration : chambre modelisee, vue isometrique.
 * Route chargee en lazy (voir main.tsx) pour garder Three.js hors du bundle initial.
 * TODO(feat/explore-room) : charger room.glb, placer les hotspots interactifs.
 */
export function ExploreRoom() {
  return (
    <div className="explore-root">
      <Canvas>
        <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={50} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 3]} intensity={1} />
        <Suspense fallback={null}>
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#7c3aed" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
