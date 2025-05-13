import { useState } from 'react';
import Arrow from '../../../public/icons/menu-bar/ArrowLeft.svg?react';

import { useNavigate } from 'react-router-dom';
import SearchBar from '../Zip/SearchBar';
import { postSearchHistory } from '../../api/booksnap.api';

const BookSearchHeader = () => {
  const [searchWord, setSearchWord] = useState('');
  const nav = useNavigate();

  const handleSearch = () => {
    nav(`/booksnap?query=${searchWord}`);
    postSearchHistory('booktitle', searchWord);
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-20 m-auto flex max-w-[500px] items-center gap-[15px] border-b-[1px] border-[#544F4F] bg-bg px-[20px] py-[10px]">
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
