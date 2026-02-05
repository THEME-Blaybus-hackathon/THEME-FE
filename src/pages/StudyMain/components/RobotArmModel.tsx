import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThreeElements, ThreeEvent } from "@react-three/fiber";

type Props = ThreeElements["group"] & {
  explode?: number;
};

export default function RobotArmModel({ explode = 0, ...props }: Props) {
  const { scene } = useGLTF("/src/assets/example/RobotArm.glb");

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const EX_FACTOR = 10; // 분해 배수

  // 방향 계산
  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3(0, 0, 0);
    const id = name.split("_")[0];
    const num = parseInt(id.replace(/\D/g, ""), 10);

    if (name.includes("Solid") && num >= 1000) {
      const step = num - 1000;
      const intensity = 0.6 * Math.pow(0.9, step);

      dir.set(
        num % 2 ? intensity : -intensity,
        num > 1006 ? -0.5 : 0,
        num > 1006 ? 0 : -intensity,
      );
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
    const hoverId = hoveredName?.split("_")[0];

    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));

      obj.position.lerp(target, 0.05);

      if (obj instanceof THREE.Mesh) {
        const thisId = name.split("_")[0];
        const isHit = !!hoverId && thisId === hoverId;
        const mat = obj.material as THREE.MeshStandardMaterial;

        if (mat && mat.emissive) {
          mat.emissive.set(isHit ? "#00888d" : "#000000");
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

useGLTF.preload("/src/assets/example/RobotArm.glb");
