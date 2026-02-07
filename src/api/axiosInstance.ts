import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 지금은 인증 방식 미정 → 기본 false
  // 쿠키 기반으로 갈 경우 true 로만 바꾸면 됨
  withCredentials: false,
});

export default axiosInstance;
