import {
  HeaderWrapper,
  Left,
  LogoGroup,
  Center,
  NavItem,
  Right,
  LogoutButton,
} from './Header.style';

import Logo from '/src/assets/images/Logo.svg';
import Logo2 from '/src/assets/images/Logo2.svg';

export default function Header() {
  return (
    <HeaderWrapper>
      <Left>
        <LogoGroup>
          <img src={Logo} alt="SIMVEX Logo" />
          <img src={Logo2} alt="SIMVEX Text Logo" />
        </LogoGroup>
      </Left>

      <Center>
        <NavItem>스터디</NavItem>
        <NavItem>퀴즈</NavItem>
        <NavItem>워크플로우</NavItem>
        <NavItem>My Study</NavItem>
      </Center>

      <Right>
        <LogoutButton>로그아웃</LogoutButton>
      </Right>
    </HeaderWrapper>
  );
}
