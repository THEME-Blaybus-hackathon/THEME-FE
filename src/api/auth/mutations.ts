import { useMutation } from '@tanstack/react-query';
import { postLogout } from './auth';
import { useAuthStore } from '../../store/useAuthStore';

export function useLogoutMutation() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
    },
  });
}
