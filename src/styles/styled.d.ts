/* eslint-disable @typescript-eslint/no-empty-object-type */

import 'styled-components';
import { theme } from './theme';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

/**
 * 왜 이 파일이 필요한가?
 *
 * styled-components의 ThemeProvider는 내부적으로 DefaultTheme 타입을 사용한다.
 * 하지만 기본 DefaultTheme은 비어 있는 타입이기 때문에,
 * 우리가 정의한 theme 객체(colors, spacing 등)의 구조를 TypeScript가 알 수 없다.
 *
 * 이 파일은 module augmentation을 통해
 * styled-components의 DefaultTheme을
 * 프로젝트에서 사용하는 theme 객체의 타입으로 확장한다.
 *
 * 이 설정이 없으면:
 * - styled-components 내부의 theme 타입이 `any`로 취급됨
 * - theme.colors, theme.spacing 등에 대한 자동완성 불가
 * - theme 키 오타가 컴파일 단계에서 잡히지 않음
 *
 * 이 설정이 있으면:
 * - theme 구조가 타입으로 보장됨
 * - IDE 자동완성 및 타입 안전성 확보
 * - 디자인 토큰 변경 시 영향 범위를 컴파일 단계에서 확인 가능
 *
 * 즉, TypeScript + styled-components를
 * "타입 안전하게" 사용하기 위한 필수 설정이다.
 */
