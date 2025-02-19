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

  const handleGoBack = () => {
    restoreBottomSheet();
    nav(-1);
  };

  const nav = useNavigate();
  // 앞으로 추가
  const showBackButtonPaths = ['/mypage/change-nickname', '/zip/create-review', '/booksnap/create'];
  const showBackButton = showBackButtonPaths.includes(location.pathname);

  const showCloseButtonPaths = ['/bookie'];
  const showCloseButton = showCloseButtonPaths.includes(location.pathname);

  return (
    <div
      className={`flex items-center bg-white px-2 py-3 ${location.pathname !== '/bookie' ? 'border-b-2 border-gray-100' : ''}`}
    >
      {showBackButton && (
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={handleGoBack}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>
      )}
      {showCloseButton && (
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={handleGoBack}>
          <IoCloseOutline size={30} className="stroke-main_1" />
        </div>
      )}
      <div className="flex-1 text-center text-[20px] font-medium tracking-[-0.8px] text-main_1">{title}</div>
      {showBackButton || showCloseButton ? <div className="w-11" /> : ''}
    </div>
  );
};

export default Header;
