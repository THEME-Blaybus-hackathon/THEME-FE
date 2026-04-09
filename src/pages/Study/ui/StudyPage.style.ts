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

export const TextContent = styled.main`
  padding: 56px 80px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  color: rgba(90, 130, 255, 0.9);
`;

export const Explan = styled.p`
  font-size: 20px;
  color: #cbd5e1;
`;

export const CardWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: 50%;
  padding: 32px 80px 64px;
  display: flex;
  flex-direction: row;

  gap: 36px;
`;
