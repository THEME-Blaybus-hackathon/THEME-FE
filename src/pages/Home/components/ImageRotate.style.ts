import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlassCard = styled.div`
  position: relative;
  width: 400px;
  height: 450px;
  overflow: hidden;

  background: linear-gradient(
    10deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-radius: 28px;

  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.25),
    0 20px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

export const ImageTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  width: 100%;
  height: 100%;

  transform: translateX(${({ currentIndex }) => `-${currentIndex * 100}%`});

  transition: transform 0.6s ease-in-out;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: contain;
`;

export const DotWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  gap: 8px;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;

  background-color: ${({ active }) =>
    active ? 'white' : 'rgba(255,255,255,0.4)'};

  transition: background-color 0.3s;
`;
