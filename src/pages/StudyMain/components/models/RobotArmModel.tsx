import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';
import PartTooltip from './PartTooltip';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

/* =========================
 * 파트 설명
 * ========================= */
const PART_DESCRIPTION_MAP: Record<string, string> = {
  'Robot Base': '로봇 암 전체를 지지하는 베이스 구조입니다.',
  'Arm Part 2': '로봇 암의 하부 관절 파트입니다.',
  'Arm Part 3': '로봇 암의 중간 관절 파트입니다.',
  'Arm Part 4': '로봇 암의 확장 관절 파트입니다.',
  'Arm Part 5': '로봇 암의 보조 관절 파트입니다.',
  'Arm Part 6': '로봇 암의 상부 관절 파트입니다.',
  'Arm Part 7': '로봇 암의 말단 이전 관절입니다.',
  'Arm Part 8': '로봇 암의 말단 구동 파트입니다.',
};

/* =========================
 * meshName → 파트 title 매핑
 * ========================= */
const PART_TITLE_MATCHERS: {
  match: (meshName: string) => boolean;
  title: string;
}[] = [
  {
    match: (n) => n.includes('Solid1_1') || n.includes('Solid1_2'),
    title: 'Robot Base',
  },
  { match: (n) => n.includes('Solid1001_'), title: 'Arm Part 2' },
  { match: (n) => n.includes('Solid1002_'), title: 'Arm Part 3' },
  { match: (n) => n.includes('Solid1003_'), title: 'Arm Part 4' },
  { match: (n) => n.includes('Solid1004_'), title: 'Arm Part 5' },
  { match: (n) => n.includes('Solid1005_'), title: 'Arm Part 6' },
  { match: (n) => n.includes('Solid1006_'), title: 'Arm Part 7' },
  {
    match: (n) => n.includes('Solid1007') || n.includes('Solid1008'),
    title: 'Arm Part 8',
  },
];

export default function RobotArmModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/RobotArm.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const originalScaleRef = useRef<Record<string, THREE.Vector3>>({});
  const lastCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const logTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastExplodeRef = useRef<number>(explode);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  /** 🔑 드론 모델과 동일한 카메라 제어 플래그 */
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const isAutoCameraRef = useRef(false);

  const EX_FACTOR = 10;

  /* =========================
   * explode 방향
   * ========================= */
  const getDir = (name: string): THREE.Vector3 => {
    const dir = new THREE.Vector3();
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
    const saved = sessionStorage.getItem('RobotArm');
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
    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

      partsRef.current[obj.name] = obj;
      initialPosRef.current[obj.name] = obj.position.clone();
      originalScaleRef.current[obj.name] = obj.scale.clone();
    });
  }, [scene]);

  /* =========================
   * 카메라 타겟 설정 (드론과 동일)
   * ========================= */
  useEffect(() => {
    if (!selectedMeshName) {
      // ✅ 선택 해제 → 자유 회전
      isAutoCameraRef.current = false;
      cameraTargetRef.current = null;
      return;
    }

    const targets = Object.values(partsRef.current).filter((obj) =>
      matchBySelectedName(selectedMeshName, obj.name),
    );

    if (!targets.length) return;

    const center = new THREE.Vector3();
    targets.forEach((obj) => {
      const p = new THREE.Vector3();
      obj.getWorldPosition(p);
      center.add(p);
    });
    center.divideScalar(targets.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));
    isAutoCameraRef.current = true;
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

        sessionStorage.setItem('RobotArm', JSON.stringify(payload));
      }, 10);
    }
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      obj.position.lerp(
        base.clone().add(getDir(name).multiplyScalar(explode * EX_FACTOR)),
        0.05,
      );

      const isActive = matchBySelectedName(selectedMeshName, name);
      const isHover =
        hoveredName && matchBySelectedName(getHoveredPartTitle(), name);

      // ✅ 스케일 호버
      const baseScale = originalScaleRef.current[name];
      if (baseScale) {
        obj.scale.lerp(
          isHover ? baseScale.clone().multiplyScalar(1.03) : baseScale,
          0.15,
        );
      }

      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        if (!mat?.emissive) return;

        if (isActive) {
          mat.emissive.set('#00e5ff');
          mat.emissiveIntensity = 3.5;
          mat.opacity = 0.65;
        } else if (isHover) {
          mat.emissive.set('#00bcd4');
          mat.emissiveIntensity = 2.8;
          mat.opacity = 0.8;
        } else {
          mat.emissive.set('#000');
          mat.emissiveIntensity = 0;
          mat.opacity = 1;
        }

        mat.transparent = true;
      }
    });

    // 🎯 드론 모델과 동일한 카메라 제어
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
      onPointerOver={(e) => {
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

useGLTF.preload('/assets/models/RobotArm.glb');
