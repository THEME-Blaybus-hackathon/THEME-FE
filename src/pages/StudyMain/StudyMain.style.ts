import styled from "styled-components";

/* =========================
   ROOT
========================= */
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  font-family: Pretendard, system-ui, sans-serif;
  color: rgba(235, 240, 255, 0.92);
`;

/* =========================
   MAIN / VIEWPORT
========================= */
export const Main = styled.main`
  flex: 1;
  position: relative;
`;

export const ViewportFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Viewport = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  background:
    radial-gradient(
      820px 520px at 50% 42%,
      rgba(90, 140, 220, 0.22) 0%,
      rgba(0, 0, 0, 0) 58%
    ),
    radial-gradient(
      1600px 1000px at 50% 68%,
      rgba(0, 0, 0, 0.82) 70%,
      rgba(0, 0, 0, 0.96) 100%
    ),
    #060b14;
`;

/* =========================
   LAYERS
========================= */
export const CanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  background:
    radial-gradient(
      900px 600px at 50% 45%,
      rgba(90, 140, 220, 0.22),
      rgba(0, 0, 0, 0) 60%
    ),
    linear-gradient(to bottom, rgba(20, 30, 50, 0.35), rgba(5, 8, 15, 0.65));
`;

export const UILayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
`;

/* =========================
   LEFT CONTROLS
========================= */
export const LeftControls = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  display: flex;
  gap: 14px;
  pointer-events: auto;
`;

export const ModelSelect = styled.select`
  height: 46px;
  padding: 0 22px;

  border-radius: 999px;
  border: 1px solid rgba(160, 180, 220, 0.25);

  background: rgba(20, 28, 40, 0.78);
  backdrop-filter: blur(14px);

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
`;
export const RightControls = styled.div`
  position: absolute;
  right: 28px;
  bottom: 90px;
  display: flex;
  flex-direction: row; /* reverse 대신 일반 row로 하고 순서를 맞추는 게 클릭 이벤트 잡기에 더 안정적입니다 */
  align-items: flex-end;
  gap: 15px;
  z-index: 2000; /* 최대한 높여서 OrbitControls 방해 차단 */
  pointer-events: auto; /* 명시적으로 이벤트 허용 */
`;
export const DownloadButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;

  border-radius: 25px;
  border: 1px solid rgba(90, 140, 220, 0.55);

  background: rgba(90, 140, 220, 0.18);
  color: rgba(120, 170, 255, 0.95);

  font-size: 15px;
  font-height: 20;
  font-weight: 10;

  cursor: pointer;
  transition: all 180ms ease;

  &:hover {
    background: rgba(90, 140, 220, 0.32);
  }
`;

/* =========================
   RIGHT RAIL
========================= */
export const TopRail = styled.div`
  position: absolute;
  right: 10px;
  top: 20%;

  display: flex;
  flex-direction: column;
  gap: 0px;
  z-index: 10;

  pointer-events: auto;
`;

export const RightBottomRail = styled.div`
  position: absolute;
  right: 40px;
  top: 89%;

  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 10;

  pointer-events: auto;
`;

export const ClickableIcon = styled.img`
  width: 60px;
  height: 60px;

  cursor: pointer;

  opacity: 0.9;

  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    filter 0.18s ease;

  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));

  &:hover {
    transform: translateY(-2px) scale(1.06);
    opacity: 1;
    filter: drop-shadow(0 14px 32px rgba(0, 0, 0, 0.45));
  }

  &:active {
    transform: translateY(0) scale(0.98);
    opacity: 0.85;
  }
`;

export const IconButton = styled.button<{ active?: boolean }>`
  height: ${({ active }) => (active ? "96px" : "54px")};
  width: 54px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ active }) => (active ? "10px" : "0")};

  padding: 8px, 0;

  border-radius: 8px;

  border: 1px solid
    ${({ active }) =>
      active ? "rgba(120, 160, 255, 0.45)" : "rgba(255, 255, 255, 0.25)"};

  background: ${({ active }) =>
    active ? "rgba(120, 160, 255, 0.28)" : "rgba(255, 255, 255, 0.18)"};

  color: ${({ active }) => (active ? "#e8f0ff" : "#f5f7fa")};

  font-size: 13px;
  font-weight: 800;

  backdrop-filter: blur(18px) saturate(130%);
  -webkit-backdrop-filter: blur(18px) saturate(130%);

  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  transition:
    height 0.28s ease,
    background 0.25s ease,
    border 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  /* 아이콘 */
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 22px;
      height: 22px;
    }
  }

  /* 텍스트 */
  .label {
    font-size: 12px;
    line-height: 0.5;

    opacity: ${({ active }) => (active ? 1 : 0)};
    transform: ${({ active }) =>
      active ? "translateY(0)" : "translateY(-4px)"};

    transition:
      opacity 0.22s ease,
      transform 0.22s ease;

    pointer-events: none;
  }
`;

/* =========================
   BOTTOM SLIDER
========================= */
export const ExplodeBox = styled.div`
  position: absolute;
  left: 50%;
  bottom: 70px;
  transform: translateX(-50%);

  width: 320px;
  pointer-events: auto;
`;

export const Slider = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 10px;

  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);

  &::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border-radius: 999px;
    background: rgba(90, 140, 220, 1);
    cursor: pointer;
  }
`;

/* =========================
   BLUE INFO PANEL
========================= */
export const BlueInfoPanel = styled.aside`
  position: absolute;
  right: 55px;
  top: 40px;
  z-index: 9;

  width: 340px;
  height: calc(100vh - 200px);

  background: rgba(30, 40, 60, 0.45);
  backdrop-filter: blur(1px) saturate(400%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);

  border-radius: 28px;
  padding: 28px 28px 24px;

  display: flex;
  flex-direction: column;
  pointer-events: auto;

  border: 1px solid rgba(120, 160, 220, 0.22);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.02) 2%,
      rgba(0, 0, 0, 0.08)
    );

    pointer-events: none;
  }

  animation: panelIn 0.35s ease-out forwards;

  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateX(24px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: rgba(160, 190, 240, 0.6);
`;

export const PanelTitle = styled.h2`
  margin: 0 0 18px 0;

  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;

  color: rgba(245, 248, 255, 0.96);
`;

export const CloseButton = styled.button`
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
  border: none;

  background: rgba(120, 160, 220, 0.18);
  color: rgba(210, 225, 255, 0.8);

  font-size: 18px;
  font-weight: 700;
  line-height: 1;

  cursor: pointer;
  transition: all 160ms ease;

  &:hover {
    background: rgba(120, 160, 220, 0.32);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.94);
  }
`;

export const InfoBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.65;

  color: rgba(225, 235, 255, 0.92);
  white-space: pre-wrap;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(120, 160, 220, 0.45);
    border-radius: 2px;
  }
`;
