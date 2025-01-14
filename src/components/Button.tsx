interface ButtonProps {
	text: string;
}

const Button = ({ text }: ButtonProps) => {
	return (
		<button className="text-main_4 rounded-[5px] bg-gradient-to-b from-[#6589DE] to-[#526EAE] py-2.5 text-[14px]">
			{text}
		</button>
	);
};

export default Button;
