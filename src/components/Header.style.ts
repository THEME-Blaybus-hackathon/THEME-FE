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
    height: 28px;
  }
`;

export const Center = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const NavItem = styled.button`
  background: none;
  border: none;

  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  padding: 4px 0;

  &:hover {
    opacity: 0.8;
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
