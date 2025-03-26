import FilterButton from '../../components/Button/FilterButton';

const TagBar = () => {
  return (
    <div className="relative flex gap-2">
      <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
        <div className="flex gap-[10px] after:w-[20px] after:flex-shrink-0 after:content-['']">
          <FilterButton text="#고양이" />
          <FilterButton text="#분위기 있는 서점" />
          <FilterButton text="#책과 함께 술을" />
          <FilterButton text="#분위기" />
          <FilterButton text="#인문서적" />
        </div>
      </div>
    </div>
  );
};

export default TagBar;
