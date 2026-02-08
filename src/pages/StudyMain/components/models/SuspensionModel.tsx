import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

export default function SuspensionModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/Suspension.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);

  const EX_FACTOR = 7;

  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3();

    if (name.includes('Nit')) dir.set(0, -1.2, 0);
    else if (name.includes('Nut')) dir.set(0, 1.9, 0);
    else if (name.includes('Spring')) dir.set(0, 0.6, 0);
    else if (name.includes('Rod')) dir.set(0, 0.9, 0);
    else if (name.includes('Base')) dir.set(0, -0.7, 0);

    return dir;
  };

  const matchBySelectedName = (
    selected: string | null,
    meshName: string,
  ): boolean => {
    if (!selected) return false;

    switch (selected) {
      case 'Coil Spring':
        return meshName.includes('Spring');

      case 'Shock Rod':
        return meshName.includes('Rod');

      case 'Lock Nut':
        return meshName.includes('Nut') || meshName.includes('Nit');

      case 'Base':
        return meshName.includes('Base');

      case 'Fixing Pin':
        return meshName.includes('Solid1');

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

      partsRef.current[obj.name] = obj;

      if (obj instanceof THREE.Mesh) {
        names.push(obj.name);
      }

      const dir = getDir(obj.name);
      const basePos = obj.position
        .clone()
        .sub(dir.multiplyScalar(explode * EX_FACTOR));

      initialPosRef.current[obj.name] = basePos;
    });

    console.log('🧩 Suspension GLB Mesh Parts:', names);
  }, [scene, explode]);

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

    const targets = Object.values(partsRef.current).filter((obj) =>
      matchBySelectedName(selectedMeshName, obj.name),
    );

    if (targets.length === 0) return;

    const center = new THREE.Vector3();
    targets.forEach((obj) => {
      const p = new THREE.Vector3();
      obj.getWorldPosition(p);
      center.add(p);
    });
    center.divideScalar(targets.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));

    console.log('🎥 선택된 Suspension 파트:', selectedMeshName);
    console.log(
      '📦 매칭 mesh:',
      targets.map((t) => t.name),
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

useGLTF.preload('/assets/models/Suspension.glb');
