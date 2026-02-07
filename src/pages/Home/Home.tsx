import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import Header from '../../components/Header';
import ImageRotate from './components/ImageRotate';
import {
  PageWrapper,
  Content,
  Title,
  Explan,
  TextContent,
  StudyButton,
} from './Home.style';

export default function Home() {
  const login = useAuthStore((state) => state.login);

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
      <Content>
        <TextContent>
          <Title>랜딩 페이지 소개 문구</Title>
          <Explan>랜딩 페이지 소개 세부 설명</Explan>
          <StudyButton>스터디 시작하기</StudyButton>
        </TextContent>

        <ImageRotate />
      </Content>
    </PageWrapper>
  );
}
