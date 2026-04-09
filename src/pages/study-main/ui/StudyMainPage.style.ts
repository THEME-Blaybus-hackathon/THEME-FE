import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  font-family: Pretendard, system-ui, sans-serif;
  color: rgba(235, 240, 255, 0.92);

  background: radial-gradient(
    800px 500px at 50% 50%,
    #4a5568 0%,
    #3b4552 22%,
    #232833 48%,
    #12151b 72%,
    #06080c 100%
  );
`;

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
  background: transparent;
`;

export const CanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

export const UILayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
`;

export const LeftControls = styled.div`
  position: absolute;
  top: 20px;
  left: 50px;
  display: flex;
  gap: 14px;
  pointer-events: auto;
`;

export const ModelSelect = styled.select`
  height: 30px;
  padding: 0 40px;

  border-radius: 999px;
  border: 1px solid rgba(160, 180, 220, 0);

  background: #9ea2b74d;
  backdrop-filter: blur(100px);

  color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
`;

export const RightControls = styled.div`
  position: absolute;
  top: 2%;
  right: 20px;
  display: flex;
  gap: 14px;
  pointer-events: auto;
`;

export const AIPanelWrapper = styled.div`
  position: fixed;
  right: 13vw;
  bottom: 12vh;

  z-index: 20;
  pointer-events: auto;

  width: 360px;
  max-height: 70vh;
`;

export const DownloadButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 0;

  border-radius: 10px;
  border: 1px solid #4c60cb;

  background: #4c60cb4d;
  color: rgba(120, 170, 255, 0.95);

  font-size: 15px;
  font-weight: 10;

  cursor: pointer;
  transition: all 180ms ease;

  &:hover {
    background: rgba(90, 140, 220, 0.32);
  }
`;

export const TopRail = styled.div`
  position: absolute;
  left: 50px;
  top: 10%;

  display: flex;
  flex-direction: row;
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
  height: 54px;
  width: ${({ active }) => (active ? '96px' : '54px')};

  display: flex;
  align-items: center;
  justify-content: ${({ active }) => (active ? 'flex-start' : 'center')};

  padding: ${({ active }) => (active ? '0 16px' : '0')};

  border-radius: 10px;

  border: 1px solid
    ${({ active }) =>
      active ? 'rgba(120, 160, 255, 0)' : 'rgba(255, 255, 255, 0)'};

  background: ${({ active }) =>
    active ? '#4C60CB80' : 'rgba(255, 255, 255, 0.18)'};

  color: ${({ active }) => (active ? '#e8f0ff' : '#f5f7fa')};

  font-size: 13px;
  font-weight: 800;

  backdrop-filter: blur(18px) saturate(130%);
  -webkit-backdrop-filter: blur(18px) saturate(130%);

  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  transition:
    width 0.25s ease,
    padding 0.25s ease,
    background 0.25s ease,
    border 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ active }) =>
      active ? 'rgba(120, 160, 255, 0.38)' : 'rgba(255, 255, 255, 0.28)'};
  }

  &:active {
    transform: translateY(0);
    box-shadow:
      0 6px 18px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 22px;
      height: 22px;
      opacity: ${({ active }) => (active ? 1 : 0.9)};
    }
  }

  .label {
    margin-left: 10px;

    ${({ active }) => !active && 'display: none;'}
    ${({ active }) => active && 'display: block; white-space: nowrap;'}
  }
`;

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

export const SliderHeader = styled.div`
  margin-bottom: 14px;
`;

export const SliderTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: rgba(240, 245, 255, 0.95);
`;

export const SliderDesc = styled.div`
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(200, 215, 255, 0.7);
`;

export const SliderTrackWrapper = styled.div`
  margin: 18px 0 10px;
`;

export const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  color: rgba(235, 240, 255, 0.9);
`;
