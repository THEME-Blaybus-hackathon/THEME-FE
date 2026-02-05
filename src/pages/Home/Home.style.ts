import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30vw;

  padding: ${({ theme }) => theme.spacing.lg};
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

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-left: ${({ theme }) => theme.spacing.lg};
`;

export const StudyButton = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: 12px 24px;

  width: fit-content;

  background-color: ${({ theme }) => theme.colors.primarylight};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;

  cursor: pointer;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.1);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;
