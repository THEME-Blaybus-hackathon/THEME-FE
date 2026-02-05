import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: 260px;
  height: 220px;
  padding: 16px;

  border-radius: 16px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 48px ${({ theme }) => theme.colors.primary}80;
  }
`;

export const Tag = styled.div`
  position: absolute;
  top: -10px;
  left: 16px;

  padding: 4px 10px;
  border-radius: 12px;

  font-size: 12px;
  font-weight: 600;

  background: ${({ theme }) => theme.colors.primary};
  color: #e6fffa;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 130px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const Description = styled.p`
  margin-top: 12px;

  font-size: 13px;
  color: #d1d5db;
  text-align: center;
`;
