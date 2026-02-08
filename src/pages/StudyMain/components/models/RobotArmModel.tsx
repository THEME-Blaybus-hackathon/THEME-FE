import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

export default function RobotArmModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/RobotArm.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);

  const EX_FACTOR = 10;

  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3(0, 0, 0);
    const id = name.split('_')[0];
    const num = parseInt(id.replace(/\D/g, ''), 10);

    if (name.includes('Solid') && num >= 1000) {
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

  const matchBySelectedName = (
    selected: string | null,
    meshName: string,
  ): boolean => {
    if (!selected) return false;

    switch (selected) {
      case 'Robot Base':
        return meshName.includes('Solid1_1') || meshName.includes('Solid1_2');

      case 'Arm Part 2':
        return meshName.includes('Solid1001_');

      case 'Arm Part 3':
        return meshName.includes('Solid1002_');

      case 'Arm Part 4':
        return meshName.includes('Solid1003_');

      case 'Arm Part 5':
        return meshName.includes('Solid1004_');

      case 'Arm Part 6':
        return meshName.includes('Solid1005_');
      case 'Arm Part 7':
        return meshName.includes('Solid1006_');
      case 'Arm Part 8':
        return meshName.includes('Solid1007') || meshName.includes('Solid1008');

      default:
        return false;
    }
  };

  useEffect(() => {
    if (!defaultCameraPosRef.current) {
      defaultCameraPosRef.current = camera.position.clone();
    }

    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

      partsRef.current[obj.name] = obj;

      const dir = getDir(obj.name);
      const basePos = obj.position
        .clone()
        .sub(dir.multiplyScalar(explode * EX_FACTOR));

      initialPosRef.current[obj.name] = basePos;
    });
  }, [scene]);

  useEffect(() => {
    if (!hoveredName) return;

    const matched = Object.keys(partsRef.current).filter((name) =>
      matchBySelectedName(hoveredName, name),
    );

    console.log('🟢 Hover:', hoveredName);
    console.log('📦 매칭된 mesh 목록:', matched);
  }, [hoveredName]);

  useEffect(() => {
    if (!selectedMeshName) {
      cameraTargetRef.current = defaultCameraPosRef.current?.clone() ?? null;
      return;
    }

    const matched = Object.values(partsRef.current).filter((obj) =>
      matchBySelectedName(selectedMeshName, obj.name),
    );

    if (matched.length === 0) return;

    const center = new THREE.Vector3();
    matched.forEach((obj) => {
      const pos = new THREE.Vector3();
      obj.getWorldPosition(pos);
      center.add(pos);
    });
    center.divideScalar(matched.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));

    console.log('🦾 선택된 로봇암 파트:', selectedMeshName);
    console.log(
      '📦 포함된 mesh:',
      matched.map((o) => o.name),
    );
  }, [selectedMeshName]);

  useFrame(() => {
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));
      obj.position.lerp(target, 0.05);

      if (!(obj instanceof THREE.Mesh)) return;

      const isActive = matchBySelectedName(selectedMeshName, name);
      const isHover = matchBySelectedName(hoveredName, name);

      const mat = obj.material as THREE.MeshStandardMaterial;
      if (!mat?.emissive) return;

      if (isActive) {
        mat.emissive.set('#00e5ff');
        mat.emissiveIntensity = 3.5;
        mat.opacity = 0.65;
      } else if (isHover) {
        mat.emissive.set('#00888d');
        mat.emissiveIntensity = 2.5;
        mat.opacity = 0.7;
      } else {
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
        mat.opacity = 1;
      }

      mat.transparent = true;
    });

    if (cameraTargetRef.current) {
      camera.position.lerp(cameraTargetRef.current, 0.08);
      camera.lookAt(0, 0, 0);

      if (camera.position.distanceTo(cameraTargetRef.current) < 0.05) {
        cameraTargetRef.current = null;
      }
    }
  });

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (e.object.name) setHoveredName(e.object.name);
      }}
      onPointerOut={() => setHoveredName(null)}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/models/RobotArm.glb');
