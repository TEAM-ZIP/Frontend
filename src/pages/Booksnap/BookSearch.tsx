import Logo from '../../../public/icons/menu-bar/logo.svg?react';
import RecentSearch from '../../components/Booksnap/RecentSearch';
import Tag from '../../components/Common/Tag';
import SearchBar from '../../components/Zip/SearchBar';
import { useState } from 'react';

const BookSearch = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = () => {};

  const bookname = ['구원의 날', '지구에서 한아뿐', '사이키쿠스오'];
  const recent = ['하이큐 10권', '우리가 빛의 속도로 갈 수 없다면', '천 개의 파랑'];

  return (
    <div className="bg-bg flex h-full flex-col">
      {/* 헤더 */}
      <div className="bg-bg fixed top-0 z-20 flex w-full items-center gap-[15px] border-b-[1px] border-[#544F4F] px-[20px] py-[10px]">
        <Logo />
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSearch={handleSearch}
          text="책 제목으로 리뷰를 찾아보세요!"
        />
      </div>
      <div className="bg-bg mt-[53px] flex flex-col gap-[15px] px-[15px] py-[10px]">
        {/* 인기 검색어 */}
        <div className="flex w-full flex-col gap-[10px] border-b-[1px] border-[#A09F9F] p-[10px] text-body3 font-bold text-white">
          <p>zipzip이들이 많이 찾아본 리뷰</p>
          <div className="flex gap-[10px] py-[10px]">
            {bookname.map((book, index) => (
              <Tag name={book} key={index} />
            ))}
          </div>
        </div>
        {/* 최근 검색 */}
        <div className="flex flex-col gap-[5px]">
          <p className="px-[10px] text-body3 font-bold text-white">최근 검색</p>
          <div className="flex flex-col gap-[5px]">
            {recent.map((book, index) => (
              <RecentSearch name={book} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
