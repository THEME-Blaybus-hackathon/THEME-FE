import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { useLocation } from 'react-router-dom';

import DroneModel from './components/models/DroneModel';
import RobotArmModel from './components/models/RobotArmModel';
import RobotGripperModel from './components/models/RobotGripperModel';
import SuspensionModel from './components/models/SuspensionModel';

import Header from '../../components/Header';


import BlueInfoPanel from './components/panels/BlueInfoPanel';
import { PANEL_MAP } from './components/panelMap';

import type { ModelType, PanelTab } from '../../types/model';


import {
  Container,
  Main,
  ViewportFrame,
  Viewport,
  CanvasLayer,
  UILayer,
  LeftControls,
  IconButton,
  ModelSelect,
  DownloadButton,
  RightRail,
  ExplodeBox,
  Slider,
} from './StudyMain.style';

/** 3D 씬 안에서 회전하는 X 가이드 */
function XGuide({
  size = 120,
  opacity = 0.28,
  lineWidth = 1.2,
}: {
  size?: number;
  opacity?: number;
  lineWidth?: number;
}) {
  const half = size / 2;

  return (
    <group>
      <Line
        points={[
          [-half, 0, -half],
          [half, 0, half],
        ]}
        color="#ffffff"
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
      />
      <Line
        points={[
          [-half, 0, half],
          [half, 0, -half],
        ]}
        color="#ffffff"
        lineWidth={lineWidth}
        transparent
        opacity={opacity}
      />
    </group>
  );
}

export default function StudyMain() {
  const location = useLocation();
  const initialModel =
    (location.state as { model?: string })?.model ?? 'Drone';

  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel as ModelType);
  const [rightTab, setRightTab] = useState<PanelTab | null>('MODEL');
  const [panelOpen, setPanelOpen] = useState(true);

  const [explodes, setExplodes] = useState<Record<string, number>>({
    Drone: 0,
    Arm: 0,
    Gripper: 0,
    Suspension: 0,
  });

  const currentExplode = explodes[selectedModel] || 0;

  const handleExplodeChange = (value: number) => {
    setExplodes((prev) => ({ ...prev, [selectedModel]: value }));
  };

  const handleClickTab = (tab: 'MODEL' | 'PARTS' | 'NOTES') => {
    setRightTab(tab);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    setRightTab(null);
  };

  /** ✅ 모델 + 탭에 따른 패널 콘텐츠 결정 */
  const PanelContent =
    rightTab && PANEL_MAP[selectedModel]?.[rightTab];

  /** ✅ 탭 타이틀 */
  const getPanelTitle = () => {
    if (rightTab === 'MODEL') return 'MODEL INFO';
    if (rightTab === 'PARTS') return 'PARTS';
    return 'NOTES';
  };

  return (
    <Container>
      <Header />

      <Main>
        <ViewportFrame>
          <Viewport>
            {/* ===== 3D CANVAS ===== */}
            <CanvasLayer>
              <Canvas camera={{ position: [0, 10, 45], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} />

                <group position={[0, -7.5, 0]}>
                  <group position={[0, -0.25, 0]}>
                    <XGuide size={140} opacity={0.32} />
                  </group>

                  {selectedModel === 'Drone' && (
                    <group scale={[1.2, 1.2, 1.2]}>
                      <DroneModel explode={explodes.Drone} />
                    </group>
                  )}

                  {selectedModel === 'Arm' && (
                    <group scale={[0.35, 0.35, 0.35]}>
                      <RobotArmModel explode={explodes.Arm} />
                    </group>
                  )}

                  {selectedModel === 'Gripper' && (
                    <group scale={[1.3, 1.3, 1.3]}>
                      <RobotGripperModel explode={explodes.Gripper} />
                    </group>
                  )}

                  {selectedModel === 'Suspension' && (
                    <group scale={[1.2, 1.2, 1.2]}>
                      <SuspensionModel explode={explodes.Suspension} />
                    </group>
                  )}
                </group>

                <OrbitControls
                  enablePan={false}
                  minDistance={25}
                  maxDistance={80}
                  enableDamping
                  dampingFactor={0.05}
                  zoomSpeed={1.2}
                  rotateSpeed={0.8}
                />
              </Canvas>
            </CanvasLayer>

            {/* ===== UI ===== */}
            <UILayer>
              {/* 좌측 상단 */}
              <LeftControls>
                <ModelSelect
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                >
                  <option value="Drone">Drone</option>
                  <option value="Arm">Arm</option>
                  <option value="Gripper">Gripper</option>
                  <option value="Suspension">Suspension</option>
                </ModelSelect>

                <DownloadButton title="download">⬇</DownloadButton>
              </LeftControls>

              {/* ===== 오른쪽 패널 (컴포넌트화 완료) ===== */}
              {panelOpen && rightTab && PanelContent && (
                <BlueInfoPanel
                  key={`${selectedModel}-${rightTab}`}
                  title={getPanelTitle()}
                  onClose={handleClosePanel}
                >
                  <PanelContent />
                </BlueInfoPanel>
              )}

              {/* 오른쪽 레일 */}
              <RightRail>
                <IconButton
                  active={rightTab === 'MODEL'}
                  onClick={() => handleClickTab('MODEL')}
                >
                  모델
                </IconButton>
                <IconButton
                  active={rightTab === 'PARTS'}
                  onClick={() => handleClickTab('PARTS')}
                >
                  부품
                </IconButton>
                <IconButton
                  active={rightTab === 'NOTES'}
                  onClick={() => handleClickTab('NOTES')}
                >
                  노트
                </IconButton>
                <IconButton
                  style={{ marginTop: '8px', border: '1.5px solid #2F54EB' }}
                  onClick={() => alert('AI 기능 실행')}
                >
                  AI
                </IconButton>
              </RightRail>

              {/* 하단 슬라이더 */}
              <ExplodeBox>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={currentExplode}
                  onChange={(e) =>
                    handleExplodeChange(Number(e.target.value))
                  }
                />
              </ExplodeBox>
            </UILayer>
          </Viewport>
        </ViewportFrame>
      </Main>
    </Container>
  );
}
