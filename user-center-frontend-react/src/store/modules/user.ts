import { useState, useCallback } from 'react';
import { getCurrentUser } from '@/apis/user';

interface LoginUser {
  username: string;
  id?: number;
}

const useLoginUserStore = () => {
  const [loginUser, setLoginUser] = useState<LoginUser>({
    username: '未登录',
  });

  // 远程获取登录用户信息
  const fetchLoginUser = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      if (res.data.code === 0 && res.data.data) {
        setLoginUser(res.data.data);
      }
      // else {
      //   setTimeout(() => {
      //     setLoginUser({ username: '小黑子', id: 1 });
      //   }, 3000);
      // }
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  }, []);

  // 单独设置信息
  const updateLoginUser = useCallback((newLoginUser: LoginUser) => {
    setLoginUser(newLoginUser);
  }, []);

  return { loginUser, fetchLoginUser, updateLoginUser };
};

export default useLoginUserStore;
