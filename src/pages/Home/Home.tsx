import Header from '../../components/Header';
import { PageWrapper, GlobalStyle } from './Home.style';

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Header />
      </PageWrapper>
    </>
  );
}
