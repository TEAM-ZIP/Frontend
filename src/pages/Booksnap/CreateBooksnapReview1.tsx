import { useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import Header from '../../components/Common/Header';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import { getSearchBook } from '../../api/booksnap.api';
import MoreButton from '../../components/Booksnap/MoreButton';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/Booksnap/Step';

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
    <div className="flex h-full flex-col bg-bg pt-[70px]">
      {/* 헤더 */}
      <Header title="리뷰 쓰기" />
      {/* 내용 */}
      <div className="mt-[40px] flex flex-col items-center px-8">
        <Step step={1} text="리뷰할 책을 골라주세요" />
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSearch={() => handleSearch(true)}
          text="리뷰를 남기고 싶은 책을 찾아보세요!"
        />
        {bookInfo ? (
          <div className="my-6 grid grid-cols-3 gap-8 overflow-y-auto">
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
