import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  height: 64px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0);

  position: relative;
  z-index: 10;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    height: 45px;
    filter: drop-shadow(0 2px 6px rgba(90, 140, 220, 0.25));
  }
`;

export const Hover = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease;

  img {
    display: block;
    height: 28px;
  }

  &:hover {
    transform: translateY(-4px) scale(1.1);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

export const Center = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  margin-left: auto;
  margin-right: 30px;
`;

export const NavItem = styled.button`
  background: none;
  border: none;

  color: rgba(225, 235, 255, 0.9);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  padding: 4px 0;

  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    color 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.1);
    opacity: 0.95;
    color: rgba(140, 180, 255, 1);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;

  border-radius: 10px;
  border: 1px solid rgba(90, 140, 220, 0);

  background: #4C60CB;
  color: rgba(235, 242, 255, 0.95);

  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    background 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.1);
    opacity: 0.95;
    background: rgba(90, 140, 220, 0.35);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
`;
