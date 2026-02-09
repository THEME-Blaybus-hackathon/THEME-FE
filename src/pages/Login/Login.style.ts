import styled from 'styled-components';
import bgImage from '../../assets/images/background.jpg';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background:
    /* 위에서 아래로 밝아지는 오버레이 */
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.95) 10%,
      rgba(0, 0, 0, 0.75) 50%,
      rgba(0, 0, 0, 0.35) 60%,
      rgba(0, 0, 0, 0.05) 85%
    ),

    /* 중앙 비네팅 (살짝만) */
    radial-gradient(
      900px 520px at 50% 35%,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.85)
    ),

    /* 배경 이미지 */
    url(${bgImage});

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;


export const Content = styled.div`
  flex: 1;

  width: 550px;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 18px;

  align-self: center;

  z-index: 2;
`;

export const Title = styled.h1`
  font-size: 50px;
  font-weight: 800;
  line-height: 1.2;

  color: #ffffff;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(220, 225, 235, 0.9);

  background: rgba(0, 0, 0, 0.45);
  padding: 14px 18px;
  border-radius: 10px;

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  width: fit-content;
  max-width: 100%;
`;

