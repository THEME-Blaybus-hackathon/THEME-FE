import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  width: 80%;
  height: 100%;
  padding: 20px 16px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 22px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(14px);

  box-shadow:
    0 0 0 1.5px rgba(120, 160, 255, 0.55),
    0 0 18px rgba(120, 160, 255, 0.35),
    inset 0 0 12px rgba(120, 160, 255, 0.15);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;

  &:hover {
    transform: translateY(-8px) scale(1.035);

    box-shadow:
      0 0 0 2px rgba(140, 180, 255, 0.9),
      0 0 35px rgba(140, 180, 255, 0.75),
      inset 0 0 16px rgba(140, 180, 255, 0.25);

    filter: brightness(1.08);
  }

  &:active {
    transform: translateY(-4px) scale(0.985);

    box-shadow:
      0 0 0 2px rgba(140, 180, 255, 0.7),
      0 0 18px rgba(140, 180, 255, 0.5),
      inset 0 0 20px rgba(0, 0, 0, 0.25);
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
  margin-top: 10%;
  width: 100%;
  height: 60%;
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
