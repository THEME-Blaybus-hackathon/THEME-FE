import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background:
    radial-gradient(
      900px 600px at 50% 40%,
      rgba(90, 120, 200, 0.35),
      rgba(0, 0, 0, 0) 60%
    ),
    linear-gradient(to bottom, #0b1220, #060b14);
`;

export const HeroSection = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 400px);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Watermark = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 220px;
  font-weight: 800;
  letter-spacing: -0.04em;

  color: rgba(255, 255, 255, 0.06);
  user-select: none;
  pointer-events: none;
`;

export const HeroImage = styled.img`
  width: 800px;
  margin-bottom: 80px;
  opacity: 0.3;
`;

export const FrameWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  display: flex;
  justify-content: center;
  pointer-events: none;
  opacity: 0.5;
`;

export const FrameImageStyled = styled.img`
  width: 100%;
  height: auto;
`;

export const CenterText = styled.div`
  position: relative;
  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  font-weight: 500;

  color: rgba(200, 215, 255, 0.85);
`;

export const Title = styled.h1`
  font-size: 42px;
  font-weight: 800;
  line-height: 1.25;

  color: #ffffff;
`;

export const StudyButton = styled.button`
  margin-top: 16px;
  padding: 14px 28px;

  border-radius: 14px;
  border: none;

  background: rgba(90, 130, 255, 0.9);
  color: white;

  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  backdrop-filter: blur(10px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(110, 150, 255, 1);
  }

  &:active {
    transform: translateY(-1px);
  }
`;
