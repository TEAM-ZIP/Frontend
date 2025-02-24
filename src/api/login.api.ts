import instance from './instance';

// 로그인
export const SignIn = async (email: string, password: string) => {
  try {
    const response = await instance.post('/auth/signin', { email, password });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 임시 비밀번호 확인
export const IsTempPw = async () => {
  try {
    const response = await instance.get(`api/temp-password`);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// 회원가입
export const SignUp = async (email: string, password: string) => {
  try {
    const response = await instance.post('/auth/signup', { email, password });
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

// 회원가입 - 추가정보
export const SignUpAdd = async (nickname: string) => {
  let tempToken = localStorage.getItem('token');
  const headers = {
    Authorization: `${tempToken}`,
  };

  try {
    const response = await instance.post('/auth/signup/add', { nickname }, { headers });

    if (response.status === 200) {
      localStorage.removeItem('token');
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};

// 비밀번호 재전송
export const getTempPw = async (email: string) => {
  try {
    const response = await instance.post('api/new-password', { email: email });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
};
