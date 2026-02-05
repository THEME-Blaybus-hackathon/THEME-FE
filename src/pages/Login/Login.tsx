import Header from '../../components/Header';
import LoginForm from './components/LoginForm';
import { PageWrapper, Content, Title, Description } from './Login.style';

export default function LoginPage() {
  return (
    <>
      <PageWrapper>
        <Header />
        <Content>
          <Title>로그인 후 이용해주세요.</Title>
          <Description>
            SIMVEX를 통한 모든 학습은 로그인 이후 이용하실 수 있습니다.
          </Description>

          <LoginForm />
        </Content>
      </PageWrapper>
    </>
  );
}
