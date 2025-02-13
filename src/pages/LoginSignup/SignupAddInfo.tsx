import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/Login/InputField';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import instance from '../../api/instance';

const SignupAddInfo = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');

  // 닉네임 형식 확인
  const isNicknameValid = /^.{1,8}$/.test(nickname);

  const handleSubmit = async () => {
    if (!isNicknameValid) return;

    let tempToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${tempToken}`,
    };

    try {
      const response = await instance.post('/signup/add', nickname, { headers });
      if (response.status == 200) {
        console.log(response.data);
        nav('/');
      }
    } catch (err) {
      console.log(err);
    }

    nav('/');
  };

  return (
    <div className="h-screen w-full">
      {/* 헤더 */}
      <div className="flex items-center px-2 py-3">
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav(-1)}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>

        <div className="flex-1 text-center text-[20px] font-medium tracking-[-0.8px] text-main_1">추가 정보</div>
        <div className="w-11" />
      </div>
      {/* 메인 */}
      <div className="mt-[150px] flex flex-col items-center justify-center px-[55px]">
        {/* 기본 회원가입 */}
        <div className="flex w-full flex-col gap-[7px]">
          <p className="text-[14px] font-light text-main_1">닉네임</p>
          <InputField
            type="nickname"
            placeholder="8글자 이하"
            check={isNicknameValid ? 'valid' : true}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        {/* 버튼 */}
        <div className="mt-[33px] flex w-full">
          <Button text="시작하기" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignupAddInfo;
