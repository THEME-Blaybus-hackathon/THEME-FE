import styled, { createGlobalStyle } from "styled-components";

/*  Global Reset */
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;         
    padding: 0;
    overflow: hidden; 
    background: #050505;
  }
`;

/* Root */
export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;
  overflow: hidden;

  font-family:
    Pretendard,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  color: rgba(255, 255, 255, 0.92);
`;

/*  Header */
export const Header = styled.header`
  height: 84px;
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 34px;

  background: rgba(11, 11, 11, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const HeaderTitle = styled.div`
  font-weight: 900;
  font-size: 26px;
  letter-spacing: 0.5px;
  color: #ffffff;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;

  font-size: 16px;
  font-weight: 600;
`;

export const NavItem = styled.span<{ active?: boolean }>`
  cursor: pointer;
  font-weight: 800;
  transition: all 160ms ease;

  color: ${({ active }) => (active ? "#ffffff" : "rgba(255,255,255,0.86)")};

  &:hover {
    color: rgba(160, 255, 245, 0.95);
    transform: translateY(-1px);
  }
`;

export const LogoutButton = styled.button`
  margin-left: 12px;
  padding: 12px 18px;

  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  cursor: pointer;

  background: rgba(60, 150, 140, 0.72);
  color: rgba(255, 255, 255, 0.95);

  font-weight: 900;
  font-size: 15px;

  transition: all 180ms ease;

  &:hover {
    background: rgba(60, 150, 140, 0.92);
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0px);
  }
`;

/* Main / Viewport */
export const Main = styled.main`
  flex: 1;
  margin: 0;
  padding: 0;
  overflow: hidden;
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
  overflow: hidden;

  /* 중앙 밝아짐(공간감)*/
  background:
    radial-gradient(
      900px 520px at 50% 52%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.06) 25%,
      rgba(255, 255, 255, 0.02) 45%,
      rgba(0, 0, 0, 0) 70%
    ),
    radial-gradient(
      1600px 900px at 50% 55%,
      rgba(60, 255, 240, 0.06) 0%,
      rgba(0, 0, 0, 0) 55%
    ),
    radial-gradient(
      1500px 1000px at 50% 60%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.65) 70%,
      rgba(0, 0, 0, 0.92) 100%
    ),
    #050505;
`;

/** Canvas 레이어 */
export const CanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

/** UI 레이어 */
export const UILayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;

  /* OrbitControls 마우스 드래그 이벤트 막지 않게 */
  pointer-events: none;
`;

/* Left Controls*/
export const LeftControls = styled.div`
  position: absolute;
  top: 34px;
  left: 34px;
  z-index: 6;

  display: flex;
  align-items: center;
  gap: 14px;

  pointer-events: auto;
`;

export const ModelSelect = styled.select`
  height: 52px;
  width: 220px;
  padding: 0 18px;

  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  outline: none;

  background: rgba(120, 145, 145, 0.95);
  color: rgba(0, 0, 0, 0.78);

  font-size: 18px;
  font-weight: 800;

  appearance: none;
  transition: all 160ms ease;

  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
`;

export const DownloadButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 14px;

  border: 1px solid rgba(255, 255, 255, 0.22);
  cursor: pointer;

  display: grid;
  place-items: center;

  /* 더 잘 보이게 배경 강화 */
  background: rgba(70, 230, 215, 0.28);
  color: rgba(70, 230, 215, 0.98);

  font-size: 18px;
  font-weight: 900;

  transition: all 180ms ease;

  &:hover {
    background: rgba(70, 230, 215, 0.45);
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  }

  &:active {
    transform: translateY(0px);
  }
`;

/*
Info Panel (오른쪽 패널)
export const InfoPanel = styled.aside`
  position: absolute;
  right: 130px;
  top: 52%;
  transform: translateY(-50%);
  z-index: 6;

  width: 300px;
  height: 400px;

  border-radius: 18px;
  background: rgba(120, 145, 145, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.15);

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);

  padding: 16px;

  pointer-events: auto;
  transition: all 220ms ease;

  &:hover {
    transform: translateY(-52%) scale(1.01);
    border: 1px solid rgba(160, 255, 245, 0.28);
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.42);
  }
`;


export const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 900;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.82);
`;*/

export const InfoBody = styled.div`
  margin-top: 16px;
  height: calc(100% - 100px);
  overflow-y: auto;

  background: transparent;
  border: none;
  padding: 0;

  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  white-space: pre-wrap;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  padding: 5px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const RightRail = styled.div`
  position: absolute;
  right: 24px;
  top: 10%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: auto;
  align-items: flex-end;
`;

export const IconButton = styled.button<{ active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 11;

  background: ${({ active }) => (active ? "#326666" : "#FFFFFF")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#444444")};

  font-size: 14px;
  font-weight: 800;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ active }) =>
    active &&
    `
    width: 90px;
  `}

  &:hover {
    ${({ active }) => !active && "background: #F5F5F5; transform: scale(1.05);"}
  }
`;

export const BlueInfoPanel = styled.aside`
  position: absolute;
  right: 100px;
  top: 34px;
  z-index: 9;

  width: 320px;
  height: calc(100vh - 150px);

  background: #326666;
  border-radius: 24px;
  padding: 34px;
  color: #ffffff;
  box-shadow: -10px 20px 40px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  pointer-events: auto;

  animation: subtleSlide 0.3s ease-out forwards;

  @keyframes subtleSlide {
    from {
      opacity: 0;
      transform: translateX(23px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: auto;
  border-radius: 12px;
  border: none;
  background: #ffffff;
  color: rgba(160, 255, 245, 0.28);
  font-weight: 900;
  cursor: pointer;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 8px;
`;

export const PanelTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  margin: 0 0 20px 0;
`;
/*
export const RailTabs = styled.div`
  width: 86px;
  height: 360px;

  border-radius: 44px;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.18);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 42px;

  transition: all 220ms ease;

  &:hover {
    border: 1px solid rgba(160, 255, 245, 0.18);
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.42);
  }
`;

export const RailTab = styled.button<{ active?: boolean }>`
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;

  font-size: 16px;
  font-weight: 900;

  transition: all 160ms ease;

  color: ${({ active }) =>
    active ? "rgba(70, 230, 215, 0.95)" : "rgba(255,255,255,0.9)"};

  &:hover {
    color: rgba(70, 230, 215, 0.98);
    transform: translateY(-1px);
  }
`;

export const AIButton = styled.button`
  width: 82px;
  height: 82px;
  border-radius: 999px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.75);
  cursor: pointer;

  color: rgba(255, 255, 255, 0.92);
  font-weight: 900;
  font-size: 16px;

  transition: all 180ms ease;

  &:hover {
    transform: translateY(-3px);
    border: 1px solid rgba(70, 230, 215, 0.35);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
  }

  &:active {
    transform: translateY(0px);
  }
`;*/

/*Bottom Slider*/
export const ExplodeBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 64px;
  z-index: 6;

  width: 320px;
  height: 22px;

  display: flex;
  align-items: center;

  opacity: 0.95;
  transition: all 180ms ease;

  pointer-events: auto;

  &:hover {
    opacity: 1;
    transform: translateX(-50%) translateY(-1px);
  }
`;

export const Slider = styled.input.attrs({ type: "range" })`
  width: 320px;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: rgba(70, 230, 215, 0.95);
    cursor: pointer;
  }
`;
