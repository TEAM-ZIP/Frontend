import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/Login/InputField';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import instance from '../../api/instance';
import { SignUp } from '../../api/login.api';

const Signup = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState(''); // 비밀번호 확인

  // 이메일 형식 확인 함수
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 비밀번호 유효성 검사
  const isPwValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(pw);

  // 비밀번호 확인
  const isPwMatch = pw === confirmPw;

  const handleSubmit = async () => {
    if (!isEmailValid || !isPwValid || !isPwMatch) return;

    SignUp(email, pw).then((data) => {
      let tempToken = data?.headers['authorization'];
      localStorage.setItem('token', tempToken);
      console.log(tempToken);
      nav('/signup/add');
    });
  };

  return (
    <div className="h-screen w-full">
      {/* 헤더 */}
      <div className="flex items-center px-2 py-3">
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav(-1)}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>

        <div className="flex-1 text-center text-[20px] font-medium tracking-[-0.8px] text-main_1">회원가입</div>
        <div className="w-11" />
      </div>
      {/* 메인 */}
      <div className="mt-[150px] flex flex-col items-center justify-center px-[55px]">
        {/* 기본 회원가입 */}
        <div className="mb-[25px] flex w-full flex-col gap-[7px]">
          <p className="text-[14px] font-light text-main_1">이메일</p>
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요"
            check={isEmailValid ? 'valid' : true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-[7px]">
          <p className="text-[14px] font-light text-main_1">비밀번호</p>
          <div className="flex flex-col gap-[15px]">
            <InputField
              type="pw"
              placeholder="영문+숫자 조합 (8~16 자리)"
              check={isPwValid ? 'valid' : pw !== '' ? 'invalid' : true}
              onChange={(e) => setPw(e.target.value)}
            />
            {!isPwValid && pw !== '' && (
              <p className="mt-[-8px] text-[12px] font-light text-red-500">영문+숫자 조합으로 8~16자리여야 합니다.</p>
            )}
            <InputField
              type="pw"
              placeholder="비밀번호를 한 번 더 입력하세요"
              check={isPwMatch && confirmPw !== '' ? 'valid' : confirmPw !== '' ? 'invalid' : true}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
          {pw !== confirmPw && confirmPw !== '' && (
            <p className="text-[12px] font-light text-main_1">비밀번호가 일치하지 않습니다</p>
          )}
        </div>
        {/* 버튼 */}
        <div className="mt-[33px] flex w-full">
          <Button text="다음" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
