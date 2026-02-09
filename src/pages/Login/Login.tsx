import Header from '../../components/Header';
import LoginForm from './components/LoginForm';
import {
  PageWrapper,
  Content,
  Title,
  Description,
} from './Login.style';

export default function LoginPage() {
  return (
    <PageWrapper>
      <Header />

      <Content>
        <Title>
          로그인을 통해<br />
          더 나은 학습을 시작하세요
        </Title>

        <Description>
          SIMVEX를 통한 모든 학습 콘텐츠는<br />
          로그인 이후 이용하실 수 있습니다.
        </Description>

        <LoginForm />
      </Content>
    </PageWrapper>
  );
}
