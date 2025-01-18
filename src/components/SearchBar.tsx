import { CiSearch } from 'react-icons/ci';

const SearchBar = () => {
  return (
    <label className="relative block">
      <CiSearch className="text-main_1 absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px]" />
      <input
        placeholder="서점 이름, 지역 검색"
        className="w-full pl-[46px] text-[14px] py-[10px] bg-white rounded-[12px] focus:outline-none focus:ring-1 focus:ring-main_1"
      />
    </label>
  );
};

export default SearchBar;
