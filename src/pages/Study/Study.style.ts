import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const CardWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5vw;

  padding: ${({ theme }) => theme.spacing.lg};
`;

export const TextContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  margin-left: 100px;
`;

export const Title = styled.h1`
  color: white;
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Explan = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.5;
  max-width: 400px;
`;
