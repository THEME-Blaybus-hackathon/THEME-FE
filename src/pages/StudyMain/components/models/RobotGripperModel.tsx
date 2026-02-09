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
  'Base Plate': '그리퍼 하단을 지지하는 베이스 플레이트입니다.',
  'Base Gear': '그리퍼의 구동을 담당하는 중심 기어입니다.',
  'Base Mounting Bracket': '그리퍼를 로봇 암에 고정하는 브라켓입니다.',
  'Gear Link A': '그리퍼 구동을 전달하는 링크 기어 A입니다.',
  'Gear Link B': '그리퍼 구동을 전달하는 링크 기어 B입니다.',
  'Connecting Link': '기어와 그리퍼 조를 연결하는 링크입니다.',
  'Gripper Jaw': '물체를 집는 그리퍼의 집게 부분입니다.',
  'Fixing Pin': '각 부품을 고정하는 핀 부품입니다.',
};

/* =========================
 * meshName → 파트 title 매핑
 * ========================= */
const PART_TITLE_MATCHERS = [
  {
    match: (n: string) => n.includes('Solid1002') || n.includes('Solid1009'),
    title: 'Base Plate',
  },
  { match: (n: string) => n === 'Solid1', title: 'Base Gear' },
  {
    match: (n: string) => n.includes('Solid1001'),
    title: 'Base Mounting Bracket',
  },
  { match: (n: string) => n.includes('Solid1003'), title: 'Gear Link A' },
  { match: (n: string) => n.includes('Solid1004'), title: 'Gear Link B' },
  {
    match: (n: string) => n.includes('Solid1005') || n.includes('Solid1017'),
    title: 'Connecting Link',
  },
  {
    match: (n: string) => n.includes('Solid1006') || n.includes('Solid1008'),
    title: 'Gripper Jaw',
  },
  {
    match: (n: string) =>
      n.includes('Solid1018') ||
      n.includes('Solid1016') ||
      n.includes('Solid1015') ||
      n.includes('Solid1013') ||
      n.includes('Solid1014') ||
      n.includes('Solid1010') ||
      n.includes('Solid1011') ||
      n.includes('Solid1012') ||
      n.includes('Solid1007') ||
      n.includes('Solid1019'),
    title: 'Fixing Pin',
  },
];

export default function RobotGripperModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/RobotGripper.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const originalScaleRef = useRef<Record<string, THREE.Vector3>>({});
  const lastCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastExplodeRef = useRef<number>(explode);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const isAutoCameraRef = useRef(false); // ✅ 추가

  const EX_FACTOR = 7;

  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3();
    const num = Number(name.match(/\d+/)?.[0]);
    if ([1010, 1019, 1007, 1014, 1015, 1011].includes(num)) dir.set(0, 0, 0.5);
    else if ([1003, 1017, 1008].includes(num)) dir.set(1, 0, 0);
    else if ([1004, 1005, 1006].includes(num)) dir.set(-1, 0, 0);
    else if (num === 1002) dir.set(0, 0, -0.7);
    else if (num === 1009) dir.set(0, 0, -1);
    return dir;
  };

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

  /* =========================
   * 카메라 이동 (드론 모델 방식)
   * ========================= */
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
   * 프레임 루프
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
   * 툴팁
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

useGLTF.preload('/assets/models/RobotGripper.glb');
