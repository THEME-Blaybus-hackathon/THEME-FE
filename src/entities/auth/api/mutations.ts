import { useMutation } from '@tanstack/react-query';
import { postLogout } from './authApi';
import { useAuthStore } from '../model/useAuthStore';

export function useLogoutMutation() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
    },
  });
}
