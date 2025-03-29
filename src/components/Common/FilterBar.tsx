import { useEffect, useState } from 'react';

interface FilterProps {
  first: string;
  second: string;
  onChange: (selected: string) => void;
  color?: string; // Tailwind 색상 클래스: ex) 'bg-yellow'
}

const FilterBar = ({ first, second, onChange, color = 'bg-yellow' }: FilterProps) => {
  const [isSelected, setIsSelected] = useState(first);

  useEffect(() => {
    onChange(isSelected);
  }, [isSelected]);

  return (
    <div className="flex w-full overflow-hidden rounded-[20px] text-[11px] font-semibold">
      {/* 왼쪽 탭 */}
      <div
        className={`w-full cursor-pointer rounded-l-[20px] py-[5px] text-center leading-4 ${
          isSelected === first
            ? `${color} border text-black border-${color.replace('bg-', '')} border-r-0`
            : 'border border-r-0 border-white bg-bg text-white'
        } `}
        onClick={() => setIsSelected(first)}
      >
        {first}
      </div>

      {/* 오른쪽 탭 */}
      <div
        className={`w-full cursor-pointer rounded-r-[20px] py-[5px] text-center leading-4 ${
          isSelected === second
            ? `${color} border text-black border-${color.replace('bg-', '')} border-l-0`
            : 'border border-l-0 border-white bg-bg text-white'
        } `}
        onClick={() => setIsSelected(second)}
      >
        {second}
      </div>
    </div>
  );
};

export default FilterBar;
