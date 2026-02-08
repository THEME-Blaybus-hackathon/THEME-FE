import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  background:
    radial-gradient(
      900px 600px at 50% 40%,
      rgba(90, 120, 200, 0.35),
      rgba(0, 0, 0, 0) 60%
    ),
    linear-gradient(to bottom, #0b1220, #060b14);
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: ${({ theme }) => theme.spacing.md};
  align-self: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 35px;
  font-weight: 800;
  color: rgba(90, 130, 255, 0.9);
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray100};
  line-height: 1.5;
`;
