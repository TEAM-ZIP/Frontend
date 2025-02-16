import { useState } from 'react';
import SearchBar from '../../components/Booksnap/SearchBar';
import Header from '../../components/Common/Header';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import { getSearchBook } from '../../api/booksnap.api';
import MoreButton from '../../components/Booksnap/MoreButton';

const CreateBooksnapReview = () => {
  const [searchWord, setSearchWord] = useState('');
  const [bookInfo, setBookInfo] = useState<BookDetailInfo[]>();
  const [isEnd, setIsEnd] = useState<boolean>(true);

  const handleSearch = async () => {
    // 검색 API 호출
    getSearchBook(searchWord).then((data) => {
      setIsEnd(data.data.isEnd);
      setBookInfo(data.data.bookData);
    });
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <Header title="리뷰 쓰기" />
      {/* 내용 */}
      <div className="mt-[calc(100vh-46rem)] flex flex-col items-center px-8">
        <div className="flex items-center gap-4">
          <div className="h-5 w-5 rounded-full bg-main_1" />
          <div className="h-[10px] w-7 rounded-full bg-main_1" />
        </div>
        <p className="mt-3 text-body3 font-medium text-main_1">STEP 1</p>
        <div className="mt-2 h-[1px] w-[66px] bg-main_2" />
        <p className="mb-6 mt-4 text-[15px] font-light text-gray-900">리뷰할 책을 골라주세요</p>
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} onSearch={handleSearch} />
        {bookInfo ? (
          <div className="my-6 grid grid-cols-3 gap-8">
            {bookInfo.map((book) => (
              <BookInfo bookInfo={book} key={book.isbn} />
            ))}
          </div>
        ) : (
          ''
        )}
        <div className="mb-4 flex w-full items-center justify-center">
          <MoreButton />
        </div>
      </div>
    </div>
  );
};

export default CreateBooksnapReview;
