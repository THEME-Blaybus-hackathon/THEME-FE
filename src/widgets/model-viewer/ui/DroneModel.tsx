import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';
import PartTooltip from '@/shared/ui/PartTooltip';

type Props = ThreeElements['group'] & {
  explode?: number;
  selectedMeshName: string | null;
};

const PART_DESCRIPTION_MAP: Record<string, string> = {
  Nut: '볼트를 고정하는 너트 부품입니다.',
  Impeller: '공기를 흡입·배출하여 드론의 추진력을 생성합니다.',
  Gearing: '회전 속도와 토크를 조절하는 기어 시스템입니다.',
  Arm: '드론의 프레임을 지지하는 암 구조입니다.',
  xyz: '드론의 위치와 방향을 제어하는 xyz 축입니다.',
  Leg: '착륙 시 충격을 흡수하는 착륙 다리입니다.',
  'Assembly Screw': '각 부품을 결합하는 조립용 나사입니다.',
  'Beater Disc': '회전 안정성을 보조하는 디스크입니다.',
  MainFrame: '드론 전체 구조를 지지하는 메인 프레임입니다.',
};

const PART_TITLE_MATCHERS: {
  match: (meshName: string) => boolean;
  title: string;
}[] = [
  { match: (n) => n.includes('Impellar_Blade'), title: 'Impeller' },
  { match: (n) => n.includes('xyz'), title: 'xyz' },
  { match: (n) => n.includes('Nut'), title: 'Nut' },
  { match: (n) => n.includes('Gearing'), title: 'Gearing' },
  { match: (n) => n.includes('Arm'), title: 'Arm' },
  {
    match: (n) =>
      n.includes('Solid1034_') ||
      n.includes('Solid1027_') ||
      n.includes('Solid1004_'),
    title: 'Leg',
  },
  { match: (n) => n.includes('Screw'), title: 'Assembly Screw' },
  { match: (n) => n.includes('Solid1001'), title: 'Beater Disc' },
  { match: (n) => n.includes('Main'), title: 'MainFrame' },
];

export default function DroneModel({
  explode = 0,
  selectedMeshName,
  ...props
}: Props) {
  const { scene } = useGLTF('/assets/models/Drone.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});
  const originalScaleRef = useRef<Record<string, THREE.Vector3>>({});
  const lastCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const logTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastExplodeRef = useRef<number>(explode);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const isAutoCameraRef = useRef(false);

  const EX_FACTOR = 7;

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

  const getHoveredPartTitle = () => {
    if (!hoveredName) return null;
    return (
      PART_TITLE_MATCHERS.find(({ match }) => match(hoveredName))?.title ?? null
    );
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('drone');
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

      isAutoCameraRef.current = false;
      cameraTargetRef.current = null;
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.name || initialPosRef.current[obj.name]) return;

      partsRef.current[obj.name] = obj;
      initialPosRef.current[obj.name] = obj.position.clone();
      originalScaleRef.current[obj.name] = obj.scale.clone();
    });
  }, [scene]);

  useEffect(() => {
    if (!selectedMeshName) {
      isAutoCameraRef.current = false;
      cameraTargetRef.current = null;
      return;
    }

    const targets = Object.values(partsRef.current).filter((o) =>
      o.name.toLowerCase().includes(selectedMeshName.toLowerCase()),
    );

    if (!targets.length) return;

    const center = new THREE.Vector3();
    targets.forEach((o) => {
      const p = new THREE.Vector3();
      o.getWorldPosition(p);
      center.add(p);
    });
    center.divideScalar(targets.length);

    cameraTargetRef.current = center.clone().add(new THREE.Vector3(0, 3, 10));
    isAutoCameraRef.current = true;
  }, [selectedMeshName]);

  useFrame(() => {
    const currentCameraPos = camera.position.clone();

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
      lastCameraPosRef.current.copy(currentCameraPos);
      lastExplodeRef.current = explode;

      if (logTimeoutRef.current) clearTimeout(logTimeoutRef.current);

      logTimeoutRef.current = setTimeout(() => {
        const zoomDistance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
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
        sessionStorage.setItem('drone', JSON.stringify(payload));
      }, 10);
    }

    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      obj.position.lerp(
        base.clone().add(dir.multiplyScalar(explode * EX_FACTOR)),
        0.1,
      );

      const isHover =
        hoveredName && name.toLowerCase().includes(hoveredName.toLowerCase());
      const isActive =
        selectedMeshName &&
        name.toLowerCase().includes(selectedMeshName.toLowerCase());

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

    if (isAutoCameraRef.current && cameraTargetRef.current) {
      camera.position.lerp(cameraTargetRef.current, 0.08);
      camera.lookAt(0, 0, 0);
    }
  });

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

useGLTF.preload('/assets/models/Drone.glb');
