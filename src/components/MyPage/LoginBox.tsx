import kakao from '../../../public/icons/login-signup/Kakao.svg';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { logOut } from '../../api/login.api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginBox = () => {
  const nav = useNavigate();
  const isLogin = localStorage.getItem('accessToken');

  const handleLogout = async () => {
    const token = localStorage.getItem('refreshToken');
    logOut(token!).then(() => {
      toast.success('로그아웃 되었습니다.');
      nav('/');
      localStorage.clear();
    });
  };

  const handleBook = async () => {
    if (isLogin) {
      nav('myBook');
    } else {
      toast.error('로그인이 필요한 서비스입니다');
    }
  };

  const nickname = localStorage.getItem('nickname');
  return (
    <div className="flex flex-col rounded-[10px] border-[1px] border-mint pt-4">
      {isLogin ? (
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center gap-2 px-4 text-body4 text-white">
            <img src={kakao} className="h-[17px] w-[17px] rounded-full bg-[#FEE500] p-[3px]" />
            카카오 계정 회원
          </div>
          <div className="ml-4 flex items-end justify-between px-4 text-white">
            <h3 className="text-body3 font-bold">{nickname}</h3>
            <p className="text-[12px] underline" onClick={handleLogout}>
              로그아웃
            </p>
          </div>
        </div>
      ) : (
        <div className="my-3 px-4 font-bold text-white underline" onClick={() => nav('/login')}>
          로그인을 해주세요
        </div>
      )}
      <div className="mt-4 grid grid-cols-[1fr_1px_1fr] items-center rounded-[10px] border-t-[1px] border-mint py-[9px]">
        <div
          className="flex items-center justify-center gap-1 text-body4 font-semibold text-white"
          onClick={handleBook}
        >
          <BookmarkRoundedIcon sx={{ fill: '#c0e0d8', fontSize: 22 }} />
          <p>나의 책장</p>
        </div>
        <div className="h-full w-[1px] bg-mint" />
        <div
          className="flex items-center justify-center gap-1 text-body4 font-semibold text-white"
          onClick={() => toast.error('아직 준비중인 서비스입니다.')}
        >
          <RateReviewRoundedIcon sx={{ fill: '#c0e0d8', fontSize: 22 }} />
          <p>리뷰 관리</p>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
