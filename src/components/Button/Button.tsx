interface ButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
}

const Button = ({ text, onClick, color = 'mint' }: ButtonProps) => {
  const colorMap: Record<string, string> = {
    pink: '#DEBBCC',
    mint: '#91AAA4',
    green: '#C1D201',
  };

  const iconColor = colorMap[color] ?? '#CCCCCC';

  return (
    <button
      className={`bg-${color} w-full rounded-[5px] py-2.5 text-[14px] text-bg ${color == 'white' ? 'border-[1px] border-gray_3' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
