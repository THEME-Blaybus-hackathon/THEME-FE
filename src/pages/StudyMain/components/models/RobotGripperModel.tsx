import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
};

export default function DroneModel({ explode = 0, ...props }: Props) {
  const { scene } = useGLTF('/assets/models/RobotGripper.glb');

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const EX_FACTOR = 7;

  const getDir = (name: string) => {
    const dir = new THREE.Vector3(0, 0, 0);
    const match = name.match(/\d+/);
    const num = match ? parseInt(match[0], 10) : -1;

    if (num > 0 && num < 1000) {
      if (num === 1) dir.set(0, 0, 0);
    } else if (num >= 1000) {
      if (
        num === 1010 ||
        num === 1019 ||
        num === 1007 ||
        num === 1014 ||
        num === 1015 ||
        num === 1011
      ) {
        dir.set(0, 0, 0.5);
      } else if (num === 1003 || num === 1017 || num === 1008) {
        dir.set(1, 0, 0);
      } else if (num === 1004 || num === 1005 || num === 1006) {
        dir.set(-1, 0, 0);
      } else if (num === 1002) {
        dir.set(0, 0, -0.7);
      } else if (num === 1009) {
        dir.set(0, 0, -1);
      }
    }

    return dir;
  };
  useEffect(() => {
    const names: string[] = [];

    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

      // 🔹 부품 이름 수집
      if (obj instanceof THREE.Mesh) {
        names.push(obj.name);
      }

      partsRef.current[obj.name] = obj;

      const dir = getDir(obj.name);
      const basePos = obj.position
        .clone()
        .sub(dir.multiplyScalar(explode * EX_FACTOR));
      initialPosRef.current[obj.name] = basePos;
    });

    // ⭐⭐⭐ 여기다 콘솔 찍기 ⭐⭐⭐
    console.log('🧩 RobotArm GLB Mesh Parts:', names);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame(() => {
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));
      obj.position.lerp(target, 0.1);

      if (obj instanceof THREE.Mesh) {
        const isHit = hoveredName === name;
        const mat = obj.material as THREE.MeshStandardMaterial;
        if (mat && mat.emissive) {
          mat.emissive.set(isHit ? '#00888d' : '#000000');
          mat.emissiveIntensity = isHit ? 3 : 0;
          mat.opacity = isHit ? 0.6 : 1.0;
          mat.transparent = true;
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

useGLTF.preload('/assets/models/RobotGripper.glb');
