import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';
import PartTooltip from './PartTooltip';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

/* =========================
 * 파트 설명
 * ========================= */
const PART_DESCRIPTION_MAP: Record<string, string> = {
  'Coil Spring': '충격을 흡수하고 복원력을 제공하는 코일 스프링입니다.',
  'Shock Rod': '서스펜션의 상하 움직임을 전달하는 로드입니다.',
  'Lock Nut': '부품을 고정하여 풀림을 방지하는 너트입니다.',
  Base: '서스펜션 전체를 지지하는 하부 베이스입니다.',
  'Fixing Pin': '부품을 고정하는 핀 형태의 결합 요소입니다.',
};

/* =========================
 * meshName → tooltip title 매핑
 * ========================= */
const PART_TITLE_MATCHERS: {
  match: (meshName: string) => boolean;
  title: string;
}[] = [
  {
    match: (name) => name.includes('Spring'),
    title: 'Coil Spring',
  },
  {
    match: (name) => name.includes('Rod'),
    title: 'Shock Rod',
  },
  {
    match: (name) => name.includes('Nut') || name.includes('Nit'),
    title: 'Lock Nut',
  },
  {
    match: (name) => name.includes('Base'),
    title: 'Suspension Base',
  },
  {
    match: (name) => name.includes('Solid1'),
    title: 'Fixing Pin',
  },
];

export default function SuspensionModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/Suspension.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const originalScaleRef = useRef<Record<string, THREE.Vector3>>({});
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const isAutoCameraRef = useRef(false);
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const lastCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastExplodeRef = useRef<number>(explode);
  const EX_FACTOR = 7;

  /* =========================
   * explode 방향
   * ========================= */
  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3();

    if (name.includes('Nit')) dir.set(0, -1.2, 0);
    else if (name.includes('Nut')) dir.set(0, 1.9, 0);
    else if (name.includes('Spring')) dir.set(0, 0.6, 0);
    else if (name.includes('Rod')) dir.set(0, 0.9, 0);
    else if (name.includes('Base')) dir.set(0, -0.7, 0);

    return dir;
  };

  /* =========================
   * 선택된 파트 매칭
   * ========================= */
  const matchBySelectedName = (selected: string | null, meshName: string) =>
    !!selected &&
    PART_TITLE_MATCHERS.some(
      ({ title, match }) => title === selected && match(meshName),
    );

  const getHoveredPartTitle = () =>
    hoveredName
      ? (PART_TITLE_MATCHERS.find(({ match }) => match(hoveredName))?.title ??
        null)
      : null;

  useEffect(() => {
    const saved = sessionStorage.getItem('gripper');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.camera) {
        camera.position.set(data.camera.x, data.camera.y, data.camera.z);
        camera.lookAt(0, 0, 0);
        lastCameraPosRef.current = camera.position.clone();
      }

      if (typeof data.zoom === 'number') {
        const dir = camera.position.clone().normalize();
        camera.position.copy(dir.multiplyScalar(data.zoom));
      }

      // 자동 카메라 비활성화
      isAutoCameraRef.current = false;
      cameraTargetRef.current = null;

      console.log('♻️ Camera & zoom restored from sessionStorage');
    } catch (e) {
      console.error(e);
    }
  }, []);

  /* =========================
   * 초기화
   * ========================= */
  useEffect(() => {
    if (!defaultCameraPosRef.current) {
      defaultCameraPosRef.current = camera.position.clone();
    }

    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;
      partsRef.current[obj.name] = obj;
      initialPosRef.current[obj.name] = obj.position.clone();
      originalScaleRef.current[obj.name] = obj.scale.clone();
    });
  }, [scene]);

  useEffect(() => {
    if (!selectedMeshName) {
      isAutoCameraRef.current = false; // ✅ 자유 회전 복귀
      cameraTargetRef.current = null;
      return;
    }

    const targets = Object.values(partsRef.current).filter((o) =>
      matchBySelectedName(selectedMeshName, o.name),
    );
    if (!targets.length) return;

    const center = new THREE.Vector3();
    targets.forEach((o) => o.getWorldPosition(center));
    center.divideScalar(targets.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));
    isAutoCameraRef.current = true; // ✅ 자동 모드 ON
  }, [selectedMeshName]);

  /* =========================
   * 카메라 이동
   * ========================= */
  useFrame(() => {
    const currentCameraPos = camera.position.clone();

    // 최초 프레임 초기화
    if (!lastCameraPosRef.current) {
      lastCameraPosRef.current = currentCameraPos;
      lastExplodeRef.current = explode;
      return;
    }

    const cameraMoved =
      currentCameraPos.distanceTo(lastCameraPosRef.current) > 0.001;

    const explodeChanged = Math.abs(explode - lastExplodeRef.current) > 0.0001;

    const somethingMoved = cameraMoved || explodeChanged;

    if (somethingMoved) {
      // 최신 상태 갱신
      lastCameraPosRef.current.copy(currentCameraPos);
      lastExplodeRef.current = explode;

      // 기존 예약 취소
      if (logTimeoutRef.current) {
        clearTimeout(logTimeoutRef.current);
      }

      // ⏱️ 멈춘 뒤 1초 후 실행
      logTimeoutRef.current = setTimeout(() => {
        const zoomDistance = camera.position.distanceTo(
          new THREE.Vector3(0, 0, 0),
        );

        const payload = {
          explode: Number(explode.toFixed(3)),
          camera: {
            x: Number(camera.position.x.toFixed(3)),
            y: Number(camera.position.y.toFixed(3)),
            z: Number(camera.position.z.toFixed(3)),
          },
          zoom: Number(zoomDistance.toFixed(3)),
          timestamp: Date.now(),
        };

        console.log('🛑 Scene stabilized → saved to sessionStorage');
        console.log(payload);

        sessionStorage.setItem('gripper', JSON.stringify(payload));
      }, 10);
    }
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      obj.position.lerp(
        base.clone().add(getDir(name).multiplyScalar(explode * EX_FACTOR)),
        0.1,
      );

      if (!(obj instanceof THREE.Mesh)) return;

      const isActive = matchBySelectedName(selectedMeshName, name);
      const isHover =
        hoveredName && matchBySelectedName(getHoveredPartTitle(), name);

      const mat = obj.material as THREE.MeshStandardMaterial;
      if (!mat?.emissive) return;

      if (isActive) {
        mat.emissive.set('#00e5ff');
        mat.emissiveIntensity = 3.5;
        mat.opacity = 0.65;
      } else if (isHover) {
        mat.emissive.set('#00bcd4');
        mat.emissiveIntensity = 2.5;
        mat.opacity = 0.8;
      } else {
        mat.emissive.set('#000');
        mat.emissiveIntensity = 0;
        mat.opacity = 1;
      }

      mat.transparent = true;
    });

    // ✅ 드론 모델과 동일한 카메라 제어
    if (isAutoCameraRef.current && cameraTargetRef.current) {
      camera.position.lerp(cameraTargetRef.current, 0.08);
      camera.lookAt(0, 0, 0);
    }
  });
  /* =========================
   * 툴팁 위치 계산
   * ========================= */
  const hoveredPartTitle = getHoveredPartTitle();
  const hoveredObj = hoveredName ? partsRef.current[hoveredName] : null;

  const tooltipPos = hoveredObj
    ? (() => {
        const v = new THREE.Vector3();
        hoveredObj.getWorldPosition(v);
        return v;
      })()
    : null;

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

      {hoveredPartTitle && tooltipPos && (
        <PartTooltip
          position={tooltipPos}
          title={hoveredPartTitle}
          description={PART_DESCRIPTION_MAP[hoveredPartTitle]}
        />
      )}
    </group>
  );
}

useGLTF.preload('/assets/models/Suspension.glb');
