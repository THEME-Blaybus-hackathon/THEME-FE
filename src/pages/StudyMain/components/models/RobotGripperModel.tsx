import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

export default function RobotGripperModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/RobotGripper.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);

  const EX_FACTOR = 7;

  const getDir = (name: string) => {
    const dir = new THREE.Vector3(0, 0, 0);
    const match = name.match(/\d+/);
    const num = match ? parseInt(match[0], 10) : -1;

    if (num >= 1000) {
      if ([1010, 1019, 1007, 1014, 1015, 1011].includes(num))
        dir.set(0, 0, 0.5);
      else if ([1003, 1017, 1008].includes(num)) dir.set(1, 0, 0);
      else if ([1004, 1005, 1006].includes(num)) dir.set(-1, 0, 0);
      else if (num === 1002) dir.set(0, 0, -0.7);
      else if (num === 1009) dir.set(0, 0, -1);
    }

    return dir;
  };

  const matchBySelectedName = (
    selected: string | null,
    meshName: string,
  ): boolean => {
    if (!selected) return false;

    switch (selected) {
      case 'Base Plate':
        return meshName.includes('Solid1002') || meshName.includes('Solid1009');

      case 'Base Gear':
        return meshName === 'Solid1';

      case 'Base Mounting Bracket':
        return meshName.includes('Solid1001');

      case 'Gear Link A':
        return meshName.includes('Solid1003');

      case 'Gear Link B':
        return meshName.includes('Solid1004');

      case 'Connecting Link':
        return meshName.includes('Solid1005') || meshName.includes('Solid1017');
      case 'Gripper Jaw':
        return meshName.includes('Solid1006') || meshName.includes('Solid1008');
      case 'Fixing Pin':
        return (
          meshName.includes('Solid1018') ||
          meshName.includes('Solid1016') ||
          meshName.includes('Solid1015') ||
          meshName.includes('Solid1013') ||
          meshName.includes('Solid1014') ||
          meshName.includes('Solid1010') ||
          meshName.includes('Solid1011') ||
          meshName.includes('Solid1012') ||
          meshName.includes('Solid1007') ||
          meshName.includes('Solid1019')
        );

      default:
        return false;
    }
  };

  useEffect(() => {
    if (!defaultCameraPosRef.current) {
      defaultCameraPosRef.current = camera.position.clone();
    }

    const names: string[] = [];

    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

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

    console.log('🧩 RobotGripper GLB Mesh Parts:', names);
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

    const targetMeshes = Object.values(partsRef.current).filter((obj) =>
      matchBySelectedName(selectedMeshName, obj.name),
    );

    if (targetMeshes.length === 0) return;

    const center = new THREE.Vector3();
    targetMeshes.forEach((obj) => {
      const pos = new THREE.Vector3();
      obj.getWorldPosition(pos);
      center.add(pos);
    });
    center.divideScalar(targetMeshes.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));

    console.log('🖐️ 패널에서 선택된 그리퍼 부품:', selectedMeshName);
    console.log(
      '📦 매칭된 mesh:',
      targetMeshes.map((o) => o.name),
    );
  }, [selectedMeshName]);

  useFrame(() => {
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));
      obj.position.lerp(target, 0.1);

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
