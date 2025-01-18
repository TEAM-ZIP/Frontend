import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useState } from 'react';

const SignupAddInfo = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState('');

  // 닉네임 형식 확인
  const isNicknameValid = /^.{1,8}$/.test(nickname);

  const handleSubmit = () => {
    if (!isNicknameValid) return;

    // 가입 로직
    console.log('회원가입 완료');
    nav('/');
  };

  return (
    <div className="h-screen w-full">
      {/* 헤더 */}
      <div className="flex items-center px-2 py-3">
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav(-1)}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>

        <div className="text-main_1 flex-1 text-center text-[20px] font-medium tracking-[-0.8px]">추가 정보</div>
        <div className="w-11" />
      </div>
      {/* 메인 */}
      <div className="mt-[150px] flex flex-col items-center justify-center px-[55px]">
        {/* 기본 회원가입 */}
        <div className="flex w-full flex-col gap-[7px]">
          <p className="text-main_1 text-[14px] font-light">닉네임</p>
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
