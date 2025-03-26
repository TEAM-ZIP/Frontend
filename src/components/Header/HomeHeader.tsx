import { useState } from 'react';
import Logo from '../../../public/icons/menu-bar/logo.svg?react';
import SearchBar from '../Zip/SearchBar';

interface HomeHeaderProps {
  onSearch: () => void;
  setSearchWord: (value: string) => void;
  searchWord: string;
}

const HomeHeader = ({ onSearch, setSearchWord, searchWord }: HomeHeaderProps) => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 m-auto flex max-w-[500px] items-center gap-[15px] border-b-[1px] border-[#544F4F] bg-bg py-[10px] pl-[30px] pr-[30px]">
      <Logo className="h-[30px] w-6" />
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onSearch={onSearch}
        text="독립서점을 찾아보세요!"
      ></SearchBar>
    </div>
  );
};

export default HomeHeader;
