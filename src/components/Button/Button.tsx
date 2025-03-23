interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full rounded-[5px] bg-gradient-to-b from-[#C0E0D8] to-[#A4CFC3] py-2.5 text-[14px] text-bg"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
