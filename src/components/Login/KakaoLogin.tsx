import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import instance from '../../api/instance';
import Loading from '../../pages/Loading';

const KakaoLogin = () => {
  const code = useSearchParams()[0].get('code');
  const nav = useNavigate();

  const postCode = async () => {
    try {
      const response = await instance.get(`/api/kakao/oauth/login?code=${code}`);
      if (response.status == 200) {
        if (response.data.accessToken) {
          console.log('로그인 성공');
          nav('/');
        } else {
          let tempToken = response.headers['authorization'];
          localStorage.setItem('token', tempToken);
          nav('/signup/add');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postCode();
  }, [code]);

  return <Loading text="회원 확인 중..." />;
};

export default KakaoLogin;
