export type FilterType = 'Latest' | 'Like' | 'Popular';

interface FilterItem {
  name: string;
  filter: FilterType;
}

const Filter: FilterItem[] = [
  { name: '최신', filter: 'Latest' },
  { name: '좋아요', filter: 'Like' },
  { name: '요즘 인기있는', filter: 'Popular' },
];

interface FilterBarProps {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

const FilterBar = ({ filter, setFilter }: FilterBarProps) => {
  const handleClick = (filter: FilterType) => {
    setFilter(filter);
  };

  return (
    <div className="text-body4 absolute flex w-full gap-5 bg-gradient-to-t from-[#F1F5FF] to-[#FFF] px-8 pt-[8px] leading-7 tracking-[-0.056px]">
      {Filter.map((cur) => (
        <span
          className={`pb-1 ${cur.filter == filter ? 'border-b-[1.5px] border-gray-900' : ''}`}
          onClick={() => handleClick(cur.filter)}
          key={cur.filter}
        >
          {cur.name}
        </span>
      ))}
    </div>
  );
};

export default FilterBar;
