import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { IoCloseOutline } from 'react-icons/io5';

interface HeaderProps {
  title?: string;
}

const Header = ({ title }: HeaderProps) => {
  if (!title) title = 'ZIP가기';
  const { restoreBottomSheet } = useBottomSheetStore();
  const location = useLocation();

  const handleGoBack = () => {
    restoreBottomSheet();
    nav(-1);
  };

  const handleClose = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    console.log(pathSegments[0]);
    nav(`/${pathSegments[0]}`);
  };

  const nav = useNavigate();
  // 앞으로 추가
  const showBackButtonPaths = [
    '/mypage/change-nickname',
    '/zip/create-review',
    '/booksnap/create/2',
    '/booksnap/create/indi/2',
    '/booksnap/create/book',
    '/mypage',
  ];
  const showBackButton = showBackButtonPaths.includes(location.pathname);

  const showCloseButtonPaths = ['/bookie', '/booksnap/create/indi/1', '/booksnap/create/1'];
  const showCloseButton = showCloseButtonPaths.includes(location.pathname);

  // 마이페이지만 헤더 글씨, 아이콘 흰색
  const myPage = location.pathname.startsWith('/mypage');

  return (
    <div className="fixed left-0 right-0 top-0 m-auto w-full max-w-[500px]">
      <div className={`flex items-center bg-bg px-2 py-3`}>
        {showBackButton && (
          <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={handleGoBack}>
            <FaAngleLeft size={24} className={`${myPage ? 'fill-white' : 'fill-mint'}`} />
          </div>
        )}
        {showCloseButton && (
          <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={handleClose}>
            <IoCloseOutline size={30} className="stroke-mint" />
          </div>
        )}
        <div
          className={`flex-1 text-center text-[20px] font-medium tracking-[-0.8px] ${myPage ? 'text-white' : 'text-mint'}`}
        >
          {title}
        </div>
        {showBackButton || showCloseButton ? <div className="w-11" /> : ''}
      </div>
    </div>
  );
};

export default Header;
