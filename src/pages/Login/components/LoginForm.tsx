import {
  KakaoButton,
  ButtonContent,
  CompanyLogo,
  NaverButton,
  GoogleButton,
} from './LoginForm.style';
import kakaoLogo from '@/assets/images/KakaoLogo.png';
import naverLogo from '@/assets/images/NaverLogo.png';
import googleLogo from '@/assets/images/googleLogo.png';

export default function LoginForm() {
  return (
    <>
      <KakaoButton>
        <ButtonContent>
          <CompanyLogo src={kakaoLogo} alt="Kakao Logo" />
          <span>카카오 로그인</span>
        </ButtonContent>
      </KakaoButton>

      <NaverButton>
        <ButtonContent>
          <CompanyLogo src={naverLogo} alt="Naver Logo" />
          <span>네이버로 시작하기</span>
        </ButtonContent>
      </NaverButton>

      <GoogleButton>
        <ButtonContent>
          <CompanyLogo src={googleLogo} alt="Google Logo" />
          <span>Google 계정으로 로그인</span>
        </ButtonContent>
      </GoogleButton>
    </>
  );
}
