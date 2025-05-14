import { useEffect, useState } from 'react';
import { getRecentSearch } from '../../api/booksnap.api';
import RecentSearch from '../../components/Booksnap/RecentSearch';
import Tag from '../../components/Common/Tag';
import BookSearchHeader from '../../components/Header/BookSearchHeader';

interface RecentType {
  id: number;
  searchWord: string;
}

const BookSearch = () => {
  const bookname = ['구원의 날', '지구에서 한아뿐', '사이키쿠스오'];
  const [recent, setRecent] = useState<RecentType[]>([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    getRecentSearch('booktitle', 1, 10).then((data) => {
      setRecent(data.data.searchHistory);
    });
  }, []);

  const handleClick = (bookName: string) => {
    setWord(bookName);
  };

  return (
    <div className="flex h-full flex-col bg-bg">
      {/* 헤더 */}
      <BookSearchHeader query={word} />
      <div className="mt-[53px] flex flex-col gap-[15px] bg-bg px-[15px] py-[10px]">
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
              <RecentSearch name={book.searchWord} key={index} onClick={() => handleClick(book.searchWord)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearch;
