import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  setSearchWord: (value: string) => void;
  searchWord: string;
  onSearch: () => void;
  text?: string;
}
const SearchBar = ({ setSearchWord, searchWord, onSearch, text }: SearchBarProps) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (!isComposing && e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <label className="relative block w-full">
      <IoSearch className="absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#C6B8B8]" />
      <input
        placeholder={text}
        className="w-full rounded-[20px] bg-bg_2 py-[5px] pl-[38px] text-[14px] text-[#C6B8B8] focus:outline-none focus:ring-1 focus:ring-white"
        onChange={(e) => setSearchWord(e.target.value)}
        value={searchWord}
        onKeyDown={handleEnter}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={(e) => {
          setIsComposing(false);
          setSearchWord(e.currentTarget.value);
        }}
      />
    </label>
  );
};

export default SearchBar;
