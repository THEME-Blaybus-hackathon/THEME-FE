import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import DroneModel from './components/DroneModel';

import {
  GlobalStyle,
  Container,
  Header,
  HeaderTitle,
  Nav,
  NavItem,
  LogoutButton,
  Main,
  ViewportFrame,
  Viewport,
  CanvasLayer,
  UILayer,
  LeftControls,
  ModelSelect,
  DownloadButton,
  InfoPanel,
  InfoHeader,
  CloseButton,
  InfoBody,
  RightRail,
  RailTabs,
  RailTab,
  AIButton,
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
  const [explode, setExplode] = useState(0);

  const [rightTab, setRightTab] = useState<'MODEL' | 'PARTS' | 'NOTES'>('MODEL');
  const [selectedModel, setSelectedModel] = useState('Drone');
  const [panelOpen, setPanelOpen] = useState(true);

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

  return (
    <>
      {/* 여백 제거 전역 스타일 */}
      <GlobalStyle />

      <Container>
        <Header>
          <HeaderTitle>SIMVEX</HeaderTitle>

          <Nav>
            <NavItem>스터디</NavItem>
            <NavItem>워크플로우</NavItem>
            <NavItem>MY스터디자료</NavItem>
            <LogoutButton>↪ 로그아웃</LogoutButton>
          </Nav>
        </Header>

        <Main>
          <ViewportFrame>
            <Viewport>
              {/* 3D 캔버스 */}
              <CanvasLayer>
                <Canvas camera={{ position: [0, 10, 45], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[10, 15, 10]} intensity={1.5} />

                  {/* 모델 + 가이드라인을 같은 그룹에 넣어서 같이 회전 */}
                  <group position={[0, -7.5, 0]}>
                    {/* 바닥에 살짝 깔리게 y 살짝 내림 */}
                    <group position={[0, -0.25, 0]}>
                      <XGuide size={140} opacity={0.32} />
                    </group>

                    <DroneModel explode={explode} />
                  </group>

                  <OrbitControls
                    enablePan={false}
                    minDistance={25}
                    maxDistance={80}
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
                    <option value="Robot">Robot</option>
                    <option value="Car">Car</option>
                  </ModelSelect>

                  <DownloadButton title="download">⬇</DownloadButton>
                </LeftControls>

                {/* 오른쪽 패널 */}
                {panelOpen && (
                  <InfoPanel>
                    <InfoHeader>
                      <span>{getPanelTitle()}</span>
                      <CloseButton onClick={() => setPanelOpen(false)}>
                        ×
                      </CloseButton>
                    </InfoHeader>

                    <InfoBody>
                      <div style={{ fontWeight: 900, marginBottom: 10 }}>
                        {getPanelContent()}
                      </div>
                    </InfoBody>
                  </InfoPanel>
                )}

                {/* 오른쪽 레일 */}
                <RightRail>
                  <RailTabs>
                    <RailTab
                      active={rightTab === 'MODEL'}
                      onClick={() => handleClickTab('MODEL')}
                    >
                      모델
                    </RailTab>
                    <RailTab
                      active={rightTab === 'PARTS'}
                      onClick={() => handleClickTab('PARTS')}
                    >
                      부품
                    </RailTab>
                    <RailTab
                      active={rightTab === 'NOTES'}
                      onClick={() => handleClickTab('NOTES')}
                    >
                      노트
                    </RailTab>
                  </RailTabs>

                  <AIButton onClick={() => alert('AI 기능 연결 예정')}>AI</AIButton>
                </RightRail>

                {/* 하단 슬라이더 */}
                <ExplodeBox>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={explode}
                    onChange={(e) => setExplode(Number(e.target.value))}
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
