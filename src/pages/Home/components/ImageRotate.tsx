// Home/components/ImageRotate.tsx
import styled, { keyframes } from 'styled-components';

import drone from '../../../assets/images/drone.svg';
import suspension from '../../../assets/images/suspension1.svg';
import arm from '../../../assets/images/arm.svg';
import gripper from '../../../assets/images/gripper1.svg';

//부유 애니메이션
const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-18px) rotate(2deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

//컨테이너
const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

// 공통 이미지 스타일
const FloatingImage = styled.img<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size?: number;
  delay?: number;
}>`
  position: absolute;

  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  left: ${({ left }) => left};
  right: ${({ right }) => right};

  width: ${({ size }) => size || 220}px;
  height: auto;

  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;

  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.45));
  opacity: 0.95;
`;

//컴포넌트
export default function ImageRotate() {
  return (
    <Wrapper>
      <FloatingImage src={drone} top="14%" left="8%" size={260} delay={0} />

      <FloatingImage
        src={suspension}
        bottom="10%"
        left="10%"
        size={240}
        delay={1.2}
      />

      <FloatingImage src={arm} top="18%" right="8%" size={260} delay={0.6} />

      <FloatingImage
        src={gripper}
        bottom="12%"
        right="12%"
        size={230}
        delay={1.8}
      />
    </Wrapper>
  );
}
