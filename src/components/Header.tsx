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
import Logo from '/src/assets/images/newlogo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useLogoutMutation } from '../api/auth/mutations';

export default function Header() {
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { mutate: logoutMutate, isPending } = useLogoutMutation();
  const handleLogout = () => {
    const confirmed = window.confirm('정말 로그아웃하시겠어요?');
    if (!confirmed) return;

    logoutMutate(undefined, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        alert('로그아웃에 실패했어요.');
      },
    });
  };

  return (
    <HeaderWrapper>
      <Left>
        <LogoGroup>
          <Hover onClick={() => navigate('/')}>
            <img src={Logo} alt="SIMVEX Text Logo" />
          </Hover>
        </LogoGroup>
      </Left>

      <Center>
        <NavItem onClick={() => navigate('/study')}>스터디</NavItem>
        {/* <NavItem onClick={() => navigate('/quiz')}>퀴즈</NavItem>
        <NavItem onClick={() => navigate('/workflow')}>워크플로우</NavItem>
        <NavItem onClick={() => navigate('/my-study')}>My Study</NavItem> */}
      </Center>

      <Right>
        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout} disabled={isPending}>
            로그아웃
          </LogoutButton>
        ) : (
          <LogoutButton onClick={() => navigate('/login')}>로그인</LogoutButton>
        )}
      </Right>
    </HeaderWrapper>
  );
}
