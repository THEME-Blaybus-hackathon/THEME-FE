import styled, { createGlobalStyle } from 'styled-components';

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

  font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
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

  color: ${({ active }) => (active ? '#ffffff' : 'rgba(255,255,255,0.86)')};

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

/* Info Panel (오른쪽 패널)*/
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
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 12px;

  border: 0;
  background: rgba(0, 0, 0, 0.06);
  cursor: pointer;

  font-size: 22px;
  color: rgba(0, 0, 0, 0.78);

  transition: all 160ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const InfoBody = styled.div`
  margin-top: 12px;
  height: calc(100% - 52px);

  border-radius: 14px;
  background: rgba(180, 195, 195, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding: 16px;
  color: rgba(0, 0, 0, 0.78);

  font-size: 14px;
  font-weight: 700;
`;

/*Right Rail*/
export const RightRail = styled.div`
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 6;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  pointer-events: auto;
`;

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
    active ? 'rgba(70, 230, 215, 0.95)' : 'rgba(255,255,255,0.9)'};

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
`;

/*Bottom Slider*/
export const ExplodeBox = styled.div`
  position: absolute;
  left: 110px;
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
    transform: translateY(-1px);
  }
`;

export const Slider = styled.input.attrs({ type: 'range' })`
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
