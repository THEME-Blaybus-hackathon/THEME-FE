import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { GridHelper } from 'three';
import * as THREE from 'three';

import DroneModel from '@/widgets/model-viewer/ui/DroneModel';
import RobotArmModel from '@/widgets/model-viewer/ui/RobotArmModel';
import RobotGripperModel from '@/widgets/model-viewer/ui/RobotGripperModel';
import SuspensionModel from '@/widgets/model-viewer/ui/SuspensionModel';

import modelIcon from '@/assets/images/Info.svg';
import partIcon from '@/assets/images/part.svg';
import noteIcon from '@/assets/images/note.svg';
import aiIcon from '@/assets/images/ai.svg';

import AIPanel from '@/widgets/ai-chat/ui/AIAssistantPanel';
import Header from '@/widgets/header/ui/Header';
import BlueInfoPanel from '@/widgets/study-panel/ui/BlueInfoPanel';
import { PANEL_MAP } from '@/widgets/study-panel/ui/panelMap';
import SessionListPanel from '@/widgets/ai-chat/ui/SessionListPanel';

import type { ModelType } from '@/shared/types/model';
import { useObjectCategories } from '@/entities/model/api/queries';
import { CATEGORY_MAP } from '@/entities/model/config/categoryMap';
import ModelSelectSkeleton from '@/shared/ui/ModelSelectSkeleton';

import { StudyMainProvider } from '../store/StudyMainStore';
import { useStudyMainState, useStudyMainDispatch } from '../store/useStudyMain';

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
  ExplodeBox,
  Slider,
  RightBottomRail,
  TopRail,
  ClickableIcon,
  RightControls,
  AIPanelWrapper,
  SliderHeader,
  SliderTitle,
  SliderDesc,
  SliderTrackWrapper,
  SliderLabels,
} from './StudyMainPage.style';

type ModelRenderConfig = {
  Component: React.FC<{ explode: number; selectedMeshName: string | null; onSelectMesh: (name: string | null) => void }>;
  scale: [number, number, number];
  explodeKey: ModelType;
};

const MODEL_RENDER_MAP: Record<ModelType, ModelRenderConfig> = {
  drone: {
    Component: DroneModel,
    scale: [1.2, 1.2, 1.2],
    explodeKey: 'drone',
  },
  arm: {
    Component: RobotArmModel,
    scale: [0.35, 0.35, 0.35],
    explodeKey: 'arm',
  },
  gripper: {
    Component: RobotGripperModel,
    scale: [1.3, 1.3, 1.3],
    explodeKey: 'gripper',
  },
  suspension: {
    Component: SuspensionModel,
    scale: [1.2, 1.2, 1.2],
    explodeKey: 'suspension',
  },
};

type GridGuideProps = {
  size?: number;
  divisions?: number;
  opacity?: number;
};

export function GridGuide({
  size = 120,
  divisions = 24,
  opacity = 0.25,
}: GridGuideProps) {
  const grid = useMemo(() => {
    const helper = new GridHelper(size, divisions, '#ffffff', '#ffffff');
    const mat = helper.material as THREE.LineBasicMaterial;
    mat.transparent = true;
    mat.opacity = opacity;
    return helper;
  }, [size, divisions, opacity]);

  return <primitive object={grid} />;
}

function StudyMainContent() {
  const state = useStudyMainState();
  const dispatch = useStudyMainDispatch();

  const {
    selectedModel,
    rightTab,
    panelOpen,
    selectedMeshName,
    explodes,
    aiPanelOpen,
    showSessionList,
  } = state;

  const currentExplode = explodes[selectedModel] || 0;

  const PanelContent = rightTab && PANEL_MAP[selectedModel]?.[rightTab];

  const getPanelTitle = () => {
    if (rightTab === 'MODEL') return 'MODEL INFO';
    if (rightTab === 'PARTS') return 'PARTS';
    return 'NOTES';
  };

  const { data: categoryData, isLoading, isError } = useObjectCategories();

  return (
    <Container>
      <Header />
      <Main>
        <ViewportFrame>
          <Viewport>
            <CanvasLayer>
              <Canvas camera={{ position: [0, 10, 45], fov: 45 }}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 15, 10]} intensity={1.5} />

                <group position={[0, -7.5, 0]}>
                  <group position={[0, -0.25, 0]}>
                    <GridGuide size={140} divisions={28} opacity={0.3} />
                  </group>
                  {(() => {
                    const config = MODEL_RENDER_MAP[selectedModel];
                    if (!config) return null;
                    const { Component, scale, explodeKey } = config;
                    return (
                      <group scale={scale}>
                        <Component
                          explode={explodes[explodeKey] ?? 0}
                          selectedMeshName={selectedMeshName}
                          onSelectMesh={(name) =>
                            dispatch({ type: 'SELECT_MESH', payload: name })
                          }
                        />
                      </group>
                    );
                  })()}
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

            <UILayer>
              <LeftControls>
                {isLoading && <ModelSelectSkeleton />}
                {isError && (
                  <ModelSelect disabled>
                    <option>모델 로딩 실패</option>
                  </ModelSelect>
                )}
                {!isLoading && !isError && categoryData && (
                  <ModelSelect
                    value={selectedModel}
                    onChange={(e) =>
                      dispatch({
                        type: 'SELECT_MODEL',
                        payload: e.target.value as ModelType,
                      })
                    }
                  >
                    {categoryData.categories.map((category) => {
                      const meta = CATEGORY_MAP[category as keyof typeof CATEGORY_MAP];
                      if (!meta) return null;
                      return (
                        <option key={category} value={meta.model}>
                          {meta.model}
                        </option>
                      );
                    })}
                  </ModelSelect>
                )}
              </LeftControls>

              {panelOpen && rightTab && PanelContent && (
                <BlueInfoPanel
                  key={`${selectedModel}-${rightTab}`}
                  title={getPanelTitle()}
                  onClose={() => dispatch({ type: 'CLOSE_PANEL' })}
                >
                  <PanelContent
                    selectedMeshName={selectedMeshName}
                    onSelectMesh={(name: string | null) =>
                      dispatch({ type: 'SELECT_MESH', payload: name })
                    }
                  />
                </BlueInfoPanel>
              )}

              <TopRail>
                <IconButton
                  active={rightTab === 'MODEL'}
                  onClick={() => dispatch({ type: 'CLICK_TAB', payload: 'MODEL' })}
                >
                  <span className="icon">
                    <img src={modelIcon} alt="모델" />
                  </span>
                  <span className="label">모델</span>
                </IconButton>

                <IconButton
                  active={rightTab === 'PARTS'}
                  onClick={() => dispatch({ type: 'CLICK_TAB', payload: 'PARTS' })}
                >
                  <span className="icon">
                    <img src={partIcon} alt="부품" />
                  </span>
                  <span className="label">부품</span>
                </IconButton>

                <IconButton
                  active={rightTab === 'NOTES'}
                  onClick={() => dispatch({ type: 'CLICK_TAB', payload: 'NOTES' })}
                >
                  <span className="icon">
                    <img src={noteIcon} alt="노트" />
                  </span>
                  <span className="label">노트</span>
                </IconButton>
              </TopRail>

              <RightBottomRail>
                <ClickableIcon
                  src={aiIcon}
                  alt="AI"
                  onClick={() => dispatch({ type: 'TOGGLE_AI_PANEL' })}
                />
                <AIPanelWrapper>
                  {aiPanelOpen && (
                    <AIPanel
                      objectName={selectedModel}
                      onClose={() => dispatch({ type: 'CLOSE_AI_PANEL' })}
                    />
                  )}
                </AIPanelWrapper>
              </RightBottomRail>

              <RightControls>
                {showSessionList && (
                  <SessionListPanel
                    sessions={JSON.parse(
                      localStorage.getItem('ai_chat_sessions') || '[]',
                    ).filter(
                      (s: { objectName: string }) =>
                        s.objectName.toLowerCase() === selectedModel.toLowerCase(),
                    )}
                    onClose={() => dispatch({ type: 'CLOSE_SESSION_LIST' })}
                    selectedModel={selectedModel}
                    selectedMeshName={selectedMeshName}
                  />
                )}
                <DownloadButton
                  onClick={() => dispatch({ type: 'TOGGLE_SESSION_LIST' })}
                  style={{ cursor: 'pointer', flexShrink: 0 }}
                >
                  ⬇
                </DownloadButton>
              </RightControls>

              <ExplodeBox>
                <SliderHeader>
                  <SliderTitle>Assembly mode</SliderTitle>
                  <SliderDesc>슬라이더를 이동시켜 자유롭게 분해하고 조립하세요!</SliderDesc>
                </SliderHeader>

                <SliderTrackWrapper>
                  <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={currentExplode}
                    onChange={(e) =>
                      dispatch({
                        type: 'CHANGE_EXPLODE',
                        payload: Number(e.target.value),
                      })
                    }
                  />
                </SliderTrackWrapper>

                <SliderLabels>
                  <span>조립</span>
                  <span>분해</span>
                </SliderLabels>
              </ExplodeBox>
            </UILayer>
          </Viewport>
        </ViewportFrame>
      </Main>
    </Container>
  );
}

export default function StudyMainPage() {
  const location = useLocation();
  const initialModel = (location.state as { model?: string })?.model ?? 'drone';

  return (
    <StudyMainProvider initialModel={initialModel as ModelType}>
      <StudyMainContent />
    </StudyMainProvider>
  );
}
