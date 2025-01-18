interface CategoryButtonProps {
  text: string;
}

const CategoryButton = ({ text }: CategoryButtonProps) => {
  return (
    <button className="whitespace-nowrap bg-main_2 py-[7px] text-[12px] text-[#44433F] px-3 rounded-[20px]">
      {text}
    </button>
  );
};

export default CategoryButton;
