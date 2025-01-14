import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
	const nav = useNavigate();
	// 앞으로 추가
	const showBackButtonPaths = ['/mypage/change-nickname'];
	const showBackButton = showBackButtonPaths.includes(location.pathname);

	return (
		<div className="flex items-center px-2 py-3">
			{showBackButton && (
				<div
					className="flex cursor-pointer items-center justify-center p-2.5"
					onClick={() => nav(-1)}
				>
					<FaAngleLeft size={24} className="fill-main_1" />
				</div>
			)}

			<div className="text-main_1 flex-1 text-center text-[20px] font-medium tracking-[-0.8px]">
				ZIP가기
			</div>
			{showBackButton ? <div className="w-11" /> : ''}
		</div>
	);
};

export default Header;
