import { CiSearch } from 'react-icons/ci';

interface SearchBarProps {
  setSearchWord: (value: string) => void;
  searchWord: string;
  onSearch: () => void;
}

const SearchBar = ({ setSearchWord, searchWord, onSearch }: SearchBarProps) => {
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <label className="relative w-full rounded-xl border-[0.5px] border-main_1">
      <CiSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-main_1" />
      <input
        placeholder="서점 이름, 지역 검색"
        className="w-full rounded-[12px] bg-white py-[10px] pl-[46px] text-[14px] focus:outline-none focus:ring-1 focus:ring-main_1"
        onChange={(e) => setSearchWord(e.target.value)}
        value={searchWord}
        onKeyDown={handleEnter}
      />
    </label>
  );
};

export default SearchBar;
