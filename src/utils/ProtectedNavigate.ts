import { toast } from 'react-hot-toast';
import { NavigateOptions } from 'react-router-dom';

export const protectedNavigate = (
  navigate: (to: string, options?: NavigateOptions) => void,
  path: string,
  options?: NavigateOptions,
) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    toast.error('로그인이 필요한 서비스입니다.');
    return;
  }

  navigate(path, options);
};
