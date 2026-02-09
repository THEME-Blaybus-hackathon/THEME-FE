//StudyMain.tsx
import { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { useLocation } from "react-router-dom";
import { GridHelper } from "three";
import * as THREE from "three";

import DroneModel from "./components/models/DroneModel";
import RobotArmModel from "./components/models/RobotArmModel";
import RobotGripperModel from "./components/models/RobotGripperModel";
import SuspensionModel from "./components/models/SuspensionModel";
import modelIcon from "../../assets/images/Info.svg";
import partIcon from "../../assets/images/part.svg";
import noteIcon from "../../assets/images/note.svg";
import aiIcon from "../../assets/images/ai.svg";
import Header from "../../components/Header";

import BlueInfoPanel from "./components/panels/BlueInfoPanel";
import { PANEL_MAP } from "./components/panelMap";

import type { ModelType, PanelTab } from "../../types/model";
import { useObjectCategories } from "../../api/model/queries";
import { CATEGORY_MAP } from "./constants/categoryMap";
import ModelSelectSkeleton from "./components/ModelSelectSkeleton";

type ModelRenderConfig = {
  Component: React.FC<{ explode: number }>;
  scale: [number, number, number];
  explodeKey: ModelType;
};

const MODEL_RENDER_MAP: Record<ModelType, ModelRenderConfig> = {
  Drone: {
    Component: DroneModel,
    scale: [1.2, 1.2, 1.2],
    explodeKey: "Drone",
  },
  Arm: {
    Component: RobotArmModel,
    scale: [0.35, 0.35, 0.35],
    explodeKey: "Arm",
  },
  Gripper: {
    Component: RobotGripperModel,
    scale: [1.3, 1.3, 1.3],
    explodeKey: "Gripper",
  },
  Suspension: {
    Component: SuspensionModel,
    scale: [1.2, 1.2, 1.2],
    explodeKey: "Suspension",
  },
};

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
} from "./StudyMain.style";

type GridGuideProps = {
  size?: number;
  divisions?: number;
  opacity?: number;
};

export function GridGuide({
  size = 120,
  divisions = 24, // 촘촘함 조절
  opacity = 0.25,
}: GridGuideProps) {
  const grid = useMemo(() => {
    const helper = new GridHelper(size, divisions, "#ffffff", "#ffffff");

    const mat = helper.material as THREE.LineBasicMaterial;
    mat.transparent = true;
    mat.opacity = opacity;

    return helper;
  }, [size, divisions, opacity]);

  return <primitive object={grid} />;
}

export default function StudyMain() {
  const location = useLocation();
  const initialModel = (location.state as { model?: string })?.model ?? "Drone";

  const [selectedModel, setSelectedModel] = useState<ModelType>(
    initialModel as ModelType,
  );
  const [rightTab, setRightTab] = useState<PanelTab | null>("MODEL");
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);
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

  const handleClickTab = (tab: PanelTab) => {
    if (rightTab === tab && panelOpen) {
      handleClosePanel();
    } else {
      setRightTab(tab);
      setPanelOpen(true);
    }
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    setRightTab(null);
  };

  /** ✅ 모델 + 탭에 따른 패널 콘텐츠 결정 */
  const PanelContent = rightTab && PANEL_MAP[selectedModel]?.[rightTab];

  const getPanelTitle = () => {
    switch (rightTab) {
      case "MODEL":
        return "MODEL INFO";
      case "PARTS":
        return "PARTS";
      case "NOTES":
        return "NOTES";
      case "AI":
        return "AI ASSISTANT";
      default:
        return "";
    }
  };
  const renderAIPanels = () => {
    const models: ModelType[] = ["Drone", "Arm", "Gripper", "Suspension"];
    const isAIActive = panelOpen && rightTab === "AI";

    return models.map((model) => {
      const AICleanPanel = PANEL_MAP[model]?.["AI"];
      if (!AICleanPanel) return null;

      return (
        <div
          key={`ai-persistent-${model}`}
          style={{
            display: isAIActive && selectedModel === model ? "block" : "none",
            position: "absolute",
            right: "80px",
            bottom: "30px",
            zIndex: 1000,
            pointerEvents: "auto",
          }} // ✅ 3D 배경(OrbitControls)이 클릭을 가로채지 못하게 방어막 강화
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <AICleanPanel
            selectedMeshName={selectedMeshName}
            onSelectMesh={setSelectedMeshName}
            objectName={model}
          />
        </div>
      );
    });
  };
  const { data: categoryData, isLoading, isError } = useObjectCategories();

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
                          onSelectMesh={setSelectedMeshName}
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

            {/* ===== UI ===== */}
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
                    onChange={(e) => {
                      setSelectedModel(e.target.value as ModelType);
                      setSelectedMeshName(null); // 모델 변경 시 선택된 부품 초기화
                    }}
                  >
                    {categoryData.categories.map((category) => {
                      const meta =
                        CATEGORY_MAP[category as keyof typeof CATEGORY_MAP];
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

              {panelOpen && rightTab && rightTab !== "AI" && PanelContent && (
                <BlueInfoPanel
                  key={`${selectedModel}-${rightTab}`}
                  title={getPanelTitle()}
                  onClose={handleClosePanel}
                >
                  <PanelContent
                    selectedMeshName={selectedMeshName}
                    onSelectMesh={setSelectedMeshName}
                  />
                </BlueInfoPanel>
              )}

              {renderAIPanels()}

              <TopRail>
                {["MODEL", "PARTS", "NOTES"].map((tab) => (
                  <IconButton
                    key={tab}
                    active={rightTab === tab}
                    onClick={() => handleClickTab(tab as PanelTab)}
                  >
                    {tab === "MODEL"
                      ? "모델"
                      : tab === "PARTS"
                        ? "부품"
                        : "노트"}
                  </IconButton>
                ))}
              </TopRail>

              <RightBottomRail>
                <IconButton
                  active={rightTab === "AI"}
                  style={{
                    marginTop: "8px",
                    border: "1.5px solid #2F54EB",
                    background:
                      rightTab === "AI"
                        ? "linear-gradient(135deg, #6e8efb, #a777e3)"
                        : "rgba(47, 84, 235, 0.2)",
                  }}
                  onClick={() => handleClickTab("AI")}
                >
                  🎓 AI
                </IconButton>
              </RightBottomRail>
              <RightControls>
                <DownloadButton>⬇</DownloadButton>
              </RightControls>

              {/* 하단 슬라이더 */}
              <ExplodeBox>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={currentExplode}
                  onChange={(e) => handleExplodeChange(Number(e.target.value))}
                />
              </ExplodeBox>
            </UILayer>
          </Viewport>
        </ViewportFrame>
      </Main>
    </Container>
  );
}
