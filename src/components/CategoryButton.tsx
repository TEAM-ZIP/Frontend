interface CategoryButtonProps {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}

const CategoryButton = ({ text, onClick, isSelected }: CategoryButtonProps) => {
  return (
    <button
      className={`box-border shadow-[0_4px_4px_rgba(0,0,0,0.25)] whitespace-nowrap py-[7px] text-[12px] px-3 rounded-[20px] ${isSelected ? 'bg-main_1 text-[#E5E9F2]' : ' border-[0.5px] border-main_1 bg-main_2 text-[#44433F] '}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CategoryButton;
