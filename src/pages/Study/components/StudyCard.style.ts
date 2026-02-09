import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  height: 240px;
  padding: 20px 16px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 18px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);

  border: 1px solid rgba(148, 163, 184, 0.15);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(90, 130, 500, 0.9);
    box-shadow: 0 16px 48px ${({ theme }) => theme.colors.primary}55;
  }
`;

export const Tag = styled.div`
  position: absolute;
  top: -12px;
  left: 16px;

  padding: 6px 12px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  background: rgba(90, 130, 255, 0.9);
  color: #ffff;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 140px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45));
  }
`;

export const Description = styled.p`
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
`;
