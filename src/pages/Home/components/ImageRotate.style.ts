import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GlassCard = styled.div`
  position: relative;
  width: 360px;
  height: 460px;
  overflow: hidden;

  border-radius: 28px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.2);
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
