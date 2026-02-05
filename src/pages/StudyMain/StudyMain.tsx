import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import DroneModel from './components/DroneModel';
import RobotArmModel from './components/RobotArmModel';
import RobotGripperModel from './components/RobotGripperModel';
import SuspensionModel from './components/SuspensionModel';
import Header from '../../components/Header';
import { useLocation } from 'react-router-dom';

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
  BlueInfoPanel,
  PanelHeader,
  PanelTitle,
  //InfoPanel,
  //InfoHeader,
  CloseButton,
  InfoBody,
  RightRail,
  /*RailTabs,
  RailTab,
  AIButton,*/
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
  const initialModel = (location.state as { model?: string })?.model ?? 'Drone';
  const [explodes, setExplodes] = useState<Record<string, number>>({
    Drone: 0,
    Arm: 0,
    Gripper: 0,
    Suspension: 0,
  });
  const [selectedModel, setSelectedModel] = useState(initialModel);

  const [rightTab, setRightTab] = useState<'MODEL' | 'PARTS' | 'NOTES' | null>(
    'MODEL',
  );

  const [panelOpen, setPanelOpen] = useState(true);

  // 현재 선택된 모델의 explode 값
  const currentExplode = explodes[selectedModel] || 0;

  const handleExplodeChange = (value: number) => {
    setExplodes((prev) => ({ ...prev, [selectedModel]: value }));
  };

  const handleClickTab = (tab: 'MODEL' | 'PARTS' | 'NOTES') => {
    setRightTab(tab);
    setPanelOpen(true); //탭 누르면 패널 다시 열리게
  };

  const getPanelTitle = () => {
    if (rightTab === 'MODEL') return 'DRO-1224';
    if (rightTab === 'PARTS') return '부품 정보';
    return '노트';
  };

  const getPanelContent = () => {
    if (rightTab === 'MODEL') return '3D Model Drone 입니다.';
    if (rightTab === 'PARTS') return '드론 부품 리스트/설명 영역입니다.';
    return '노트를 작성하거나 확인하는 영역입니다.';
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    setRightTab(null);
  };

  return (
    <>
      <Container>
        <Header />

        <Main>
          <ViewportFrame>
            <Viewport>
              {/* 3D 캔버스 */}
              <CanvasLayer>
                <Canvas camera={{ position: [0, 10, 45], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 15, 10]} intensity={1.5} />

                  <group position={[0, -7.5, 0]}>
                    <group position={[0, -0.25, 0]}>
                      <XGuide size={140} opacity={0.32} />
                    </group>

                    {/* ✨ 모델별로 자신의 저장된 explode 값을 전달 */}
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
                    //관성 효과 활성화
                    enableDamping={true}
                    dampingFactor={0.05}
                    zoomSpeed={1.2}
                    rotateSpeed={0.8}
                  />
                </Canvas>
              </CanvasLayer>

              {/* UI */}
              <UILayer>
                {/* 좌측 상단 */}
                <LeftControls>
                  <ModelSelect
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                  >
                    <option value="Drone">Drone</option>
                    <option value="Arm">Arm</option>
                    <option value="Gripper">Gripper</option>
                    <option value="Suspension">Suspension</option>
                  </ModelSelect>

                  <DownloadButton title="download">⬇</DownloadButton>
                </LeftControls>

                {/* 오른쪽 상세 정보 패널 (파란색) */}
                {panelOpen && rightTab && (
                  <BlueInfoPanel key={rightTab}>
                    {' '}
                    {/* key 추가: 탭 바뀔 때마다 애니메이션 재생 */}
                    <PanelHeader>
                      <span>DRO-1224</span>
                      <CloseButton onClick={handleClosePanel}>×</CloseButton>
                    </PanelHeader>
                    <PanelTitle>{getPanelTitle()}</PanelTitle>
                    <InfoBody>{getPanelContent()}</InfoBody>
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
    </>
  );
}
