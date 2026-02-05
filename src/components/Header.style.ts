import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  height: 64px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: transparent;
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

  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  padding: 4px 0;

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

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;

  border-radius: 8px;
  border: none;

  background-color: ${({ theme }) => theme.colors.primarylight};
  color: white;
  font-size: 14px;
  font-weight: 500;
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
