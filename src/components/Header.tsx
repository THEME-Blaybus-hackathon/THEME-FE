import {
  HeaderWrapper,
  Left,
  LogoGroup,
  Center,
  NavItem,
  Right,
  LogoutButton,
  Hover,
} from './Header.style';
import Logo from '/src/assets/images/Logo.svg';
import Logo2 from '/src/assets/images/Logo2.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Header() {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <Left>
        <LogoGroup>
          <img src={Logo} alt="SIMVEX Logo" />
          <Hover onClick={() => navigate('/')}>
            <img src={Logo2} alt="SIMVEX Text Logo" />
          </Hover>
        </LogoGroup>
      </Left>

      <Center>
        <NavItem onClick={() => navigate('/study')}>스터디</NavItem>
        <NavItem onClick={() => navigate('/quiz')}>퀴즈</NavItem>
        <NavItem onClick={() => navigate('/workflow')}>워크플로우</NavItem>
        <NavItem onClick={() => navigate('/my-study')}>My Study</NavItem>
      </Center>

      <Right>
        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        ) : (
          <LogoutButton onClick={() => navigate('/login')}>로그인</LogoutButton>
        )}
      </Right>
    </HeaderWrapper>
  );
}
