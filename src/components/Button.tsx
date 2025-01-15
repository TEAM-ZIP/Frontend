interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="text-main_4 w-full rounded-[5px] bg-gradient-to-b from-[#6589DE] to-[#526EAE] py-2.5 text-[14px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
