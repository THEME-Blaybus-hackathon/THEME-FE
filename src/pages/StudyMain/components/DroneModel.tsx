import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

type Props = ThreeElements['group'] & {
  explode?: number;
};

export default function DroneModel({ explode = 0, ...props }: Props) {
  const { scene } = useGLTF('/src/assets/example/Drone.glb');

  // 부품 딕셔너리
  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.name) return;

      partsRef.current[obj.name] = obj;
      initialPosRef.current[obj.name] = obj.position.clone();
    });
  }, [scene]);

  useEffect(() => {
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = new THREE.Vector3(0, 0, 0);

      // 🔧 explode 방향 규칙
      if (name.includes('Impellar') || name.includes('Beater')) {
        dir.set(0, 1, 0); // 위
      } else if (name.includes('Arm')) {
        dir.set(name.includes('_1') ? -1 : 1, 0, 0); // 좌우
      } else if (name.includes('Leg')) {
        dir.set(0, -1, 0); // 아래
      } else if (
        name.includes('Screw') ||
        name.includes('Nut') ||
        name.includes('Bearing')
      ) {
        dir.set(0, 0, 1); // 앞쪽
      }

      obj.position.set(
        base.x + dir.x * explode * 6,
        base.y + dir.y * explode * 6,
        base.z + dir.z * explode * 6,
      );
    });
  }, [explode]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/src/assets/Drone.glb');
