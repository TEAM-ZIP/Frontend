import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../api/instance';

const KakaoLogin = () => {
  const code = useSearchParams()[0].get('code');
  const nav = useNavigate();

  useEffect(() => {
    const postCode = async () => {
      try {
        const response = await instance.post('/api/kakao/oauth/login');
        if (response.status == 200) {
          console.log('성공!');
          nav('/signup/add');
        }
      } catch (error) {
        console.log(error);
      }
    };

    postCode();
  }, []);

  return null;
};

export default KakaoLogin;
