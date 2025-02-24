import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import key from '../../../public/icons/login-signup/Key.png';
import Button from '../../components/Button/Button';
import InputField from '../../components/Login/InputField';
import { useState } from 'react';
import { getTempPw } from '../../api/login.api';

const FindPw = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    getTempPw(email).then((data) => {
      nav('/login');
    });
  };

  return (
    <div className="h-screen w-full">
      {/* 헤더 */}
      <div className="flex items-center px-2 py-3">
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav('/login')}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>

        <div className="flex-1 text-center text-[20px] font-medium tracking-[-0.8px] text-main_1">비밀번호 찾기</div>
        <div className="w-11" />
      </div>
      {/* 메인 */}
      <div className="mt-[100px] flex flex-col items-center justify-center px-[55px]">
        {/* 아이콘 */}
        <div className="flex rounded-[40px] bg-key-gradient p-6">
          <img src={key} className="w-[150px]" />
        </div>
        <p className="mt-[54px] text-[20px] font-semibold tracking-[-0.8px] text-main_1">비밀번호를 잊으셨나요?</p>
        <p className="mt-[13px] border-t pt-[18px] text-[14px] leading-4">가입된 이메일로</p>
        <p className="text-[14px]">임시 비밀번호를 전송해드리겠습니다.</p>
        <div className="mt-[31px] w-full">
          <InputField type="email" placeholder="이메일을 입력해주세요" onChange={(e) => setEmail(e.target.value)} />
        </div>
        {/* 버튼 */}
        <div className="mt-[18px] flex w-full">
          <Button text="전송" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default FindPw;
