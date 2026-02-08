// Home.tsx
import { useEffect} from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import Header from '../../components/Header';
import ImageRotate from './components/ImageRotate';
import Homelogo from '../../assets/images/Homelogo.png'
import Homeframe from '../../assets/images/Homeframe.png'
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
  
} from './Home.style';
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
        {/* 배경 워터마크 */}
        <Watermark>
          <HeroImage
            src = {Homelogo} />
        </Watermark>

        {/* 중앙 텍스트 */}
        <CenterText>
          <Subtitle>3D 오브젝트 기반 공학 학습 플랫폼 simvex</Subtitle>
          <Title>추상적 이론을, 입체적 이해로</Title>

          <StudyButton onClick={() => navigate('/study')}>
            지금 바로 시작하기
          </StudyButton>

        
          
        </CenterText>

        
      </HeroSection>
      {/* 회전 / 배치된 3D 모델 */}
      <ImageRotate />
      <FrameWrapper>
    <FrameImageStyled src={Homeframe} alt="Home Frame" />
  </FrameWrapper>
    </PageWrapper>
  );
}
