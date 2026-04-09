import { KakaoButton, ButtonContent, CompanyLogo } from './LoginForm.style';

import kakaoLogo from '@/assets/images/KakaoLogo.png';

import { startSocialLogin } from '@/entities/auth/api/authApi';

export default function LoginForm() {
  return (
    <>
      <KakaoButton onClick={() => startSocialLogin('KAKAO')}>
        <ButtonContent>
          <CompanyLogo src={kakaoLogo} alt="Kakao Logo" />
          <span>카카오 로그인</span>
        </ButtonContent>
      </KakaoButton>
    </>
  );
}
