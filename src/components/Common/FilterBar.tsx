import { useEffect, useState } from 'react';

interface FilterProps {
  first: string;
  second: string;
  onChange: (selected: string) => void;
}

const FilterBar = ({ first, second, onChange }: FilterProps) => {
  const [isSelected, setIsSelected] = useState(first); // 기본값을 first로

  useEffect(() => {
    onChange(isSelected);
  }, [isSelected]);

  return (
    <div className="flex w-full justify-around rounded-[20px] border-[1px] border-solid border-white bg-bg text-[11px] font-semibold text-white">
      <div
        className={`w-full cursor-pointer rounded-l-[20px] py-[5px] text-center ${
          isSelected === first ? 'bg-pink text-black' : 'text-white'
        }`}
        onClick={() => setIsSelected(first)}
      >
        {first}
      </div>
      <div className="w-[1px] bg-white" />
      <div
        className={`w-full cursor-pointer rounded-r-[20px] py-[5px] text-center ${
          isSelected === second ? 'bg-pink text-black' : 'text-white'
        }`}
        onClick={() => setIsSelected(second)}
      >
        {second}
      </div>
    </div>
  );
};

export default FilterBar;
