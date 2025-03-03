import { useState } from 'react';
import SearchBar from '../../components/Booksnap/SearchBar';
import Header from '../../components/Common/Header';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import { getSearchBook } from '../../api/booksnap.api';
import MoreButton from '../../components/Booksnap/MoreButton';
import { useNavigate } from 'react-router-dom';

const CreateBooksnapReview = () => {
  const [searchWord, setSearchWord] = useState('');
  const [bookInfo, setBookInfo] = useState<BookDetailInfo[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const nav = useNavigate();

  const handleSearch = async (isNewSearch = false) => {
    if (isNewSearch) {
      setPage(1); // 🔥 새 검색이면 페이지 초기화
    }

    getSearchBook(searchWord, isNewSearch ? 1 : page).then((data) => {
      setIsEnd(data.data.isEnd);
      setBookInfo(isNewSearch ? data.data.bookData : (prev) => [...prev, ...data.data.bookData]);
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    });
  };

  const goToStep2 = (book: BookDetailInfo) => {
    nav('/booksnap/create/2', { state: { book: book } });
  };

  return (
    <div className="mt-[70px] flex flex-col">
      {/* 헤더 */}
      <div className="fixed left-0 right-0 top-0 m-auto w-full max-w-[500px]">
        <Header title="리뷰 쓰기" />
      </div>
      {/* 내용 */}
      <div className="mt-[40px] flex flex-col items-center px-8">
        <div className="flex items-center gap-4">
          <div className="h-5 w-5 rounded-full bg-main_1" />
          <div className="h-[10px] w-7 rounded-full bg-main_1" />
        </div>
        <p className="mt-3 text-body3 font-medium text-main_1">STEP 1</p>
        <div className="mt-2 h-[1px] w-[66px] bg-main_2" />
        <p className="mb-6 mt-4 text-[15px] font-light text-gray_1">리뷰할 책을 골라주세요</p>
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} onSearch={() => handleSearch(true)} />
        {bookInfo ? (
          <div className="my-6 grid grid-cols-3 gap-8">
            {bookInfo.map((book) => (
              <BookInfo bookInfo={book} key={book.isbn} onClick={() => goToStep2(book)} />
            ))}
          </div>
        ) : (
          ''
        )}
        {!isEnd ? (
          <div className="mb-4 flex w-full items-center justify-center">
            <MoreButton onClick={() => handleSearch()} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CreateBooksnapReview;
