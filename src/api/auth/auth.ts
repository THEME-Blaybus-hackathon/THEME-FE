import axiosInstance from '../axiosInstance';

export type SocialLoginType = 'GOOGLE' | 'KAKAO' | 'NAVER';
export type AuthClientType = 'web' | 'api';

export function startSocialLogin(
  socialLoginType: SocialLoginType,
  type: AuthClientType = 'web',
) {
  const baseURL = axiosInstance.defaults.baseURL;

  if (!baseURL) {
    throw new Error('axiosInstance baseURL is not defined');
  }

  const url = `${baseURL}/auth/${socialLoginType}?type=${type}`;

  window.location.href = url;
}

export async function postLogout(): Promise<void> {
  await axiosInstance.post('/api/auth/logout');
}
