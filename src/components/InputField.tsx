import EmailIcon from '../../public/icons/login-signup/EmailRounded.svg?react';
import PasswordIcon from '../../public/icons/login-signup/PasswordRounded.svg?react';
import NicknameIcon from '../../public/icons/menu-bar/Person_2Rounded.svg';
import { FaRegCheckCircle } from 'react-icons/fa';
interface InputFieldProps {
	type: 'email' | 'pw' | 'nickname';
	placeholder: string;
	check?: boolean | 'valid' | 'invalid';
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
	placeholder,
	type,
	check,
	onChange,
}: InputFieldProps) => {
	const icon =
		type === 'email' ? (
			<EmailIcon />
		) : type === 'pw' ? (
			<PasswordIcon />
		) : type === 'nickname' ? (
			<NicknameIcon />
		) : null;

	const checkColor =
		check === 'valid'
			? 'text-main_1'
			: check === 'invalid'
				? 'text-red-500'
				: 'text-[#C2BEBE]';

	return (
		<label className="relative block">
			<div className="text-main_1 absolute left-3 top-1/2 -translate-y-1/2">
				{icon}
			</div>
			<input
				type={`${type === 'pw' ? 'password' : 'text'}`}
				placeholder={placeholder}
				className="border-main_1 focus:border-main_2 w-full border-b bg-gradient-to-b from-[#FFF] to-[#EAF1F8] py-3 pl-10 pr-3 text-sm text-gray-800 focus:outline-none"
				onChange={onChange}
			/>
			{check && (
				<div
					className={`absolute right-3 top-1/2 -translate-y-1/2 ${checkColor}`}
				>
					<FaRegCheckCircle />
				</div>
			)}
		</label>
	);
};

export default InputField;
