export const theme = {
  colors: {
    primary: '#4f46e5',
    gray100: '#f3f4f6',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
};

/**
 * 왜 theme 객체를 정의하는가?
 *
 * theme는 이 프로젝트에서 사용하는 "디자인 규칙(Design Tokens)"을
 * 한 곳에 모아 관리하기 위한 객체이다.
 *
 * 색상, 여백, 폰트 크기와 같은 UI 관련 값들을
 * 컴포넌트 내부에서 하드코딩하지 않고
 * 의미 있는 이름(primary, md 등)으로 사용하기 위함이다.
 *
 * 이 객체를 사용하는 이유:
 * 1. 디자인 일관성 유지
 *    - 동일한 색상과 여백 규칙을 전 컴포넌트에서 공유
 *    - 팀원마다 다른 값 사용을 방지
 *
 * 2. 유지보수성 향상
 *    - 색상이나 여백 변경 시 theme 파일만 수정하면 됨
 *    - 여러 컴포넌트에 흩어진 하드코딩 값을 일괄 관리 가능
 *
 * 3. TypeScript와의 결합
 *    - styled-components의 DefaultTheme 타입과 연결되어
 *      theme.colors, theme.spacing에 대한 타입 안전성과 자동완성 제공
 *    - 존재하지 않는 키 접근 시 컴파일 단계에서 에러 발생
 *
 * 4. 확장성 확보
 *    - 다크 모드(light / dark theme)
 *    - 브랜드 리디자인
 *    - typography, zIndex, breakpoint 등 추가 확장 용이
 *
 * 즉, theme는 단순한 상수 객체가 아니라
 * 이 프로젝트 UI 전반의 기준이 되는 "디자인 설계도" 역할을 한다.
 */
