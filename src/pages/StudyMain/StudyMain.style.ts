import styled from 'styled-components';

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
    linear-gradient(
      to bottom,
      rgba(20, 30, 50, 0.35),
      rgba(5, 8, 15, 0.65)
    );
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

export const DownloadButton = styled.button`
  width: 46px;
  height: 30px;
  padding: 0;

  border-radius: 25px;
  border: 1px solid rgba(90, 140, 220, 0.55);

  background: rgba(90, 140, 220, 0.18);
  color: rgba(120, 170, 255, 0.95);

  font-size: 15px;
  font-height : 20;
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
  right: 100px;
  top: 5%;

  display: flex;
  flex-direction: row;
  gap: 12px;
  z-index: 10;

  pointer-events: auto;
`;

export const RightBottomRail = styled.div`
  position: absolute;
  left: 40px;
  top: 89%;

  display: flex;
  flex-direction: row;
  gap: 15px;
  z-index: 10;

  pointer-events: auto;
`;
export const IconButton = styled.button<{ active?: boolean }>`
  height: 54px;
  width: ${({ active }) => (active ? '94px' : '54px')};

  border-radius: 999px;
  border: 1px solid
    ${({ active }) =>
      active
        ? 'rgba(90, 140, 220, 0.65)'
        : 'rgba(255,255,255,0.35)'};

  background: ${({ active }) =>
    active
      ? 'rgba(90, 140, 220, 0.95)'
      : 'rgba(255,255,255,0.92)'};

  color: ${({ active }) => (active ? '#0f1f3a' : '#1c1c1c')};

  font-size: 13px;
  font-weight: 800;

  backdrop-filter: blur(14px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.38);

  transition: all 0.22s ease;

  &:hover {
    transform: translateY(-1px);
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

export const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  height: 4px;

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
  right: 40px;
  top: 70px;
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
    0 24px 70px rgba(0,0,0,0.5),
    inset 0 0 0 1px rgba(255,255,255,0.04);

  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background:
      linear-gradient(
        180deg,
        rgba(255,255,255,0.10),
        rgba(255,255,255,0.02) 2%,
        rgba(0,0,0,0.08)
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
