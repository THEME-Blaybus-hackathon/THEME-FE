import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ThreeElements, ThreeEvent } from '@react-three/fiber';

type Props = ThreeElements['group'] & {
  explode?: number;
};

type CameraMode = 'idle' | 'focus' | 'return';

export default function RobotGripperModel({ explode = 0, ...props }: Props) {
  const { scene } = useGLTF('/assets/models/RobotGripper.glb');
  const { camera } = useThree();

  const partsRef = useRef<Record<string, THREE.Object3D>>({});
  const initialPosRef = useRef<Record<string, THREE.Vector3>>({});

  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [activeName, setActiveName] = useState<string | null>(null);

  /** 🎥 카메라 */
  const cameraTargetRef = useRef<THREE.Vector3 | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3 | null>(null);
  const cameraModeRef = useRef<CameraMode>('idle');

  const EX_FACTOR = 7;

  /** 🔹 분해 방향 계산 (기존 로직 유지) */
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

  /** 🔹 초기 위치 + 카메라 기본 위치 저장 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  /** 🔹 프레임 처리 */
  useFrame(() => {
    const hoverId = hoveredName?.split('_')[0];
    const activeId = activeName?.split('_')[0];

    /** ===== 파트 이동 + 하이라이트 ===== */
    Object.entries(partsRef.current).forEach(([name, obj]) => {
      const base = initialPosRef.current[name];
      if (!base) return;

      const dir = getDir(name);
      const target = base.clone().add(dir.multiplyScalar(explode * EX_FACTOR));
      obj.position.lerp(target, 0.1);

      if (!(obj instanceof THREE.Mesh)) return;

      const isActive = !!activeId && name.startsWith(activeId);
      const isHover = !!hoverId && name.startsWith(hoverId);

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

    /** ===== 🎥 카메라 이동 ===== */
    if (cameraTargetRef.current) {
      camera.position.lerp(cameraTargetRef.current, 0.08);
      camera.lookAt(0, 0, 0);

      if (camera.position.distanceTo(cameraTargetRef.current) < 0.05) {
        camera.position.copy(cameraTargetRef.current);
        cameraTargetRef.current = null;
        cameraModeRef.current = 'idle';
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
      // ✅ 부품 클릭
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!e.object.name) return;

        // 🔁 같은 부품 다시 클릭 → 해제
        if (activeName === e.object.name) {
          setActiveName(null);
          cameraTargetRef.current =
            defaultCameraPosRef.current?.clone() ?? null;
          cameraModeRef.current = 'return';
          return;
        }

        setActiveName(e.object.name);

        const worldPos = new THREE.Vector3();
        e.object.getWorldPosition(worldPos);

        cameraTargetRef.current = worldPos
          .clone()
          .add(new THREE.Vector3(0, 3, 10));
        cameraModeRef.current = 'focus';

        console.log('🖐️ 선택된 그리퍼 부품', {
          name: e.object.name,
          position: worldPos,
        });
      }}
      // ✅ 빈 공간 클릭 → 선택 해제
      onPointerMissed={() => {
        setActiveName(null);
        cameraTargetRef.current = defaultCameraPosRef.current?.clone() ?? null;
        cameraModeRef.current = 'return';
      }}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/models/RobotGripper.glb');
