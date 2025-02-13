import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBottomSheetStore } from '../../store/bottomSheetStore';

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
  const showBackButtonPaths = ['/mypage/change-nickname', '/zip/create-review'];
  const showBackButton = showBackButtonPaths.includes(location.pathname);

  return (
    <div className="flex items-center bg-white px-2 py-3">
      {showBackButton && (
        <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={handleGoBack}>
          <FaAngleLeft size={24} className="fill-main_1" />
        </div>
      )}

      <div className="flex-1 text-center text-[20px] font-medium tracking-[-0.8px] text-main_1">{title}</div>
      {showBackButton ? <div className="w-11" /> : ''}
    </div>
  );
};

export default Header;
