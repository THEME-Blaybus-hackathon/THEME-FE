import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

export default function DroneModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/Drone.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);

  const EX_FACTOR = 7;

  /* =========================
   * explode 방향 계산
   * ========================= */
  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3();

    if (name.includes('Leg')) dir.set(0, -1, 0);
    else if (name.includes('Beater')) dir.set(0, 0, 1);
    else if (name.includes('Impeller')) dir.set(0, 1, 0);
    else if (name.includes('Nut') || name.includes('Gearing'))
      dir.set(0, 0.75, 0);
    else if (name.includes('Arm'))
      dir.set(name.includes('_1') || name.includes('_3') ? -0.5 : 0.5, 0, 0);
    else if (name.includes('Main'))
      dir.set(0, name.includes('001') ? -0.35 : 0.35, 0);
    else if (name.includes('Screw')) dir.set(0, -0.5, 0);

    return dir;
  };

  /* =========================
   * 선택 이름 ↔ mesh 매칭
   * ========================= */
  const matchBySelectedName = (
    selected: string | null,
    meshName: string,
  ): boolean => {
    if (!selected) return false;

    switch (selected) {
      case 'xyz':
        return meshName.includes('xyz');

      case 'Nut':
        return meshName.includes('Nut');

      case 'Main Frame':
        return meshName.includes('Mainframe');

      case 'Impeller':
        return meshName.includes('Impellar');

      case 'Gearing':
        return meshName.includes('Gearing');

      case 'Arm':
        return meshName.includes('Arm_gear_');

      case 'Leg':
        return (
          meshName.includes('Solid1034_') ||
          meshName.includes('Solid1004_') ||
          meshName.includes('Solid1040_') ||
          meshName.includes('Solid1027_')
        );

      case 'Assembly Screw':
        return meshName.includes('Screw_');

      case 'Beater Disc':
        return meshName.includes('Solid1001');

      default:
        return false;
    }
  };

  /* =========================
   * 초기 위치 & 파트 수집
   * ========================= */
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

    console.log('🎥 선택된 파트:', selectedMeshName);
    console.log(
      '📦 포함된 mesh:',
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

useGLTF.preload('/assets/models/Drone.glb');
