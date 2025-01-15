import logo from '../../public/icons/login-signup/Logo.png';
import Button from '../components/Button';
import InputField from '../components/InputField';
import KakaoIcon from '../../public/icons/login-signup/Kakao.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nav = useNavigate();
  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex w-full flex-col items-center">
        <div className="mb-[40px] items-center text-center">
          <img src={logo} className="mb-[-20px] ml-[-15px] h-[170px] w-[170px]" />
          <p className="text-main_1 text-[15px] font-light">서점을 만나다</p>
          <p className="text-main_3 border-b border-[#D9D9D9] pb-[19px] text-[26px] font-bold">서점ZIP</p>
        </div>
        <div className="flex w-full flex-col gap-[10px] px-[55px] pb-[15px]">
          <InputField type="email" placeholder="이메일을 입력해주세요" check={false} />
          <InputField type="pw" placeholder="비밀번호를 입력해주세요" check={false} />
          <p
            className="text-main_1 flex cursor-pointer justify-end text-[12px] font-light underline"
            onClick={() => nav('/find-pw')}
          >
            비밀번호 찾기
          </p>
        </div>
        <div className="mb-[30px] flex w-full flex-col gap-[10px] px-[55px]">
          <Button text="로그인" />
          <button className="flex flex-1 items-center justify-center rounded-[5px] bg-[#FEE500] py-2.5">
            <div className="flex items-center justify-center gap-2 px-6 text-[14px]">
              <img className="h-4 w-4" alt="카카오 로그인" src={KakaoIcon} />
              <h3>카카오로 시작하기</h3>
            </div>
          </button>
        </div>
        <div className="flex gap-[6px] border-t pt-[24px]">
          <span className="text-[14px] text-[#BCB3B3]">아직 회원이 아니신가요?</span>
          <span className="text-main_1 cursor-pointer text-[14px] underline" onClick={() => nav('/signup')}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
