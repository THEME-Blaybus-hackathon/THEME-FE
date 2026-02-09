import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const alertedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !alertedRef.current) {
      alertedRef.current = true;
      alert('로그인이 필요합니다.');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
