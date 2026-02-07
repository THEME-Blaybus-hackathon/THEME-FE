import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
};

export default function DroneModel({ explode = 0, ...props }: Props) {
  const { scene } = useGLTF('/assets/models/Drone.glb');

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const EX_FACTOR = 7; // 드론 분해 배수

  // 방향 계산
  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3(0, 0, 0);

    if (name.includes('Leg')) {
      dir.set(0, -1, 0);
    } else if (name.includes('Beater')) {
      dir.set(0, 0, 1);
    } else if (name.includes('Impellar')) {
      dir.set(0, 1, 0);
    } else if (name.includes('Nut') || name.includes('Gearing')) {
      dir.set(0, 0.75, 0);
    } else if (name.includes('Arm')) {
      dir.set(name.includes('_1') || name.includes('_3') ? -0.5 : 0.5, 0, 0);
    } else if (name.includes('Main')) {
      dir.set(0, name.includes('001') ? -0.35 : 0.35, 0);
    } else if (name.includes('Screw')) {
      dir.set(0, -0.5, 0);
    } else if (name.includes('Bearing')) {
      dir.set(0, 0, 1);
    }
    return dir;
  };

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

      partsRef.current[obj.name] = obj;
      const dir = getDir(obj.name);
      const basePos = obj.position
        .clone()
        .sub(dir.multiplyScalar(explode * EX_FACTOR));
      initialPosRef.current[obj.name] = basePos;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame(() => {
    const hoverId = hoveredName?.split('_')[0];

    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));

      obj.position.lerp(target, 0.1);

      if (obj instanceof THREE.Mesh) {
        const isHit = !!hoverId && name.startsWith(hoverId);

        const mat = obj.material as THREE.MeshStandardMaterial;
        if (mat.emissive) {
          mat.emissive.set(isHit ? '#00888d' : '#000000');
          mat.emissiveIntensity = isHit ? 3 : 0;
          mat.transparent = true;
          mat.opacity = isHit ? 0.6 : 1.0;
        }
      }
    });
  });

  return (
    <group
      {...props}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        if (e.object.name) setHoveredName(e.object.name);
      }}
      onPointerOut={() => setHoveredName(null)}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/models/Drone.glb');
