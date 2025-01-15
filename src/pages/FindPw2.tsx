import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import check from '../../public/icons/login-signup/Check.png';
import InputField from '../components/InputField';

const FindPw2 = () => {
	const nav = useNavigate();

	const handleSubmit = () => {
		// 이메일로 비번 전송
		console.log('비번 전송');
		nav('/login');
	};

	return (
		<div className="h-screen w-full">
			{/* 헤더 */}
			<div className="flex items-center px-2 py-3">
				<div
					className="flex cursor-pointer items-center justify-center p-2.5"
					onClick={() => nav(-1)}
				>
					<FaAngleLeft size={24} className="fill-main_1" />
				</div>

				<div className="text-main_1 flex-1 text-center text-[20px] font-medium tracking-[-0.8px]">
					비밀번호 찾기
				</div>
				<div className="w-11" />
			</div>
			{/* 메인 */}
			<div className="mt-[100px] flex flex-col items-center justify-center px-[55px]">
				{/* 아이콘 */}
				<div className="flex rounded-[40px] px-6">
					<img src={check} className="w-[150px]" />
				</div>
				<p className="text-main_1 mt-[54px] text-[20px] font-semibold tracking-[-0.8px]">
					임시 비밀번호 전송 완료!
				</p>
				<p className="mt-[13px] border-t pt-[18px] text-[14px] leading-4">
					가입된 이메일로
				</p>
				<p className="text-[14px]">임시 비밀번호를 전송해드렸습니다다.</p>
				{/* 버튼 */}
				<div className="mt-[18px] flex w-full">
					<Button text="로그인 화면으로 바로가기" onClick={handleSubmit} />
				</div>
			</div>
		</div>
	);
};

export default FindPw2;
