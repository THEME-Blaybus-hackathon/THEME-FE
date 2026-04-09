import { useEffect } from 'react';
import { useAuthStore } from '@/entities/auth/model/useAuthStore';
import Header from '@/widgets/header/ui/Header';
import ImageRotate from './ImageRotate';
import Homelogo from '@/assets/images/Homelogo.png';
import Homeframe from '@/assets/images/Homeframe.png';
import {
  PageWrapper,
  HeroSection,
  CenterText,
  Subtitle,
  Title,
  StudyButton,
  Watermark,
  HeroImage,
  FrameWrapper,
  FrameImageStyled,
} from './HomePage.style';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      login(accessToken, refreshToken);
      window.history.replaceState({}, document.title, '/');
    }
  }, [login]);

  return (
    <PageWrapper>
      <Header />

      <HeroSection>
        <Watermark>
          <HeroImage src={Homelogo} />
        </Watermark>

        <CenterText>
          <Subtitle>3D 오브젝트 기반 공학 학습 플랫폼 simvex</Subtitle>
          <Title>추상적 이론을, 입체적 이해로</Title>

          <StudyButton onClick={() => navigate('/study')}>
            지금 바로 시작하기
          </StudyButton>
        </CenterText>
      </HeroSection>

      <ImageRotate />

      <FrameWrapper>
        <FrameImageStyled src={Homeframe} alt="Home Frame" />
      </FrameWrapper>
    </PageWrapper>
  );
}
