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
import Logo from '@/assets/images/newlogo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/model/useAuthStore';
import { useLogoutMutation } from '@/entities/auth/api/mutations';

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
