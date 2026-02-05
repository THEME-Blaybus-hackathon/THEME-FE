import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray100};
  line-height: 1.5;
`;
