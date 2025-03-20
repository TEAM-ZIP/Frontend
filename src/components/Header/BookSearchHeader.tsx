import { useState } from 'react';
import Arrow from '../../../public/icons/menu-bar/ArrowLeft.svg?react';

import { useNavigate } from 'react-router-dom';
import SearchBar from '../Zip/SearchBar';

const BookSearchHeader = () => {
  const [searchWord, setSearchWord] = useState('');
  const nav = useNavigate();

  const handleSearch = () => {};

  return (
    <div className="bg-bg fixed top-0 z-20 flex w-full items-center gap-[15px] border-b-[1px] border-[#544F4F] px-[20px] py-[10px]">
      <Arrow onClick={() => nav(-1)} />
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onSearch={handleSearch}
        text="책 제목으로 리뷰를 찾아보세요!"
      ></SearchBar>
    </div>
  );
};

export default BookSearchHeader;
