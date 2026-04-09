import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonSelect = styled.div`
  width: 160px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 37%, #2a2a2a 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export default function ModelSelectSkeleton() {
  return <SkeletonSelect />;
}
