import { useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import Header from '../../components/Common/Header';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import { getSearchBook, getSearchBookByAuthor } from '../../api/booksnap.api';
import MoreButton from '../../components/Booksnap/MoreButton';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/Booksnap/Step';
import ReviewAdd from '../../components/Booksnap/ReviewAdd';
import FilterBar from '../../components/Common/FilterBar';

const CreateBooksnapReview = () => {
  const [searchWord, setSearchWord] = useState('');
  const [bookInfo, setBookInfo] = useState<BookDetailInfo[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const [searchType, setSearchType] = useState('책 제목');

  const handleSearch = async (isNewSearch = false, type = searchType) => {
    if (isNewSearch) setPage(1);
    const currentPage = isNewSearch ? 1 : page;
    const fetchFunction = type === '책 제목' ? getSearchBook : getSearchBookByAuthor;
    const data = await fetchFunction(searchWord, currentPage);

    setIsEnd(data.data.isEnd);
    setBookInfo(isNewSearch ? data.data.bookData : (prev) => [...prev, ...data.data.bookData]);
    setPage((prevPage) => prevPage + 1);
  };

  const handleFilterChange = (selected: string) => {
    setSearchType(selected);
    setPage(1);
    handleSearch(true, selected);
  };

  const goToStep2 = (book: BookDetailInfo) => {
    nav('/booksnap/create/2', { state: { book: book } });
  };

  return (
    <div className="flex h-full flex-col bg-bg pt-[70px]">
      {/* 헤더 */}
      <Header title="리뷰 작성하기" />
      {/* 내용 */}
      <div className="flex flex-col items-center overflow-auto px-8 pt-[40px]">
        <Step step={1} text="리뷰할 책을 골라주세요" />
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSearch={() => handleSearch(true)}
          text="리뷰를 남기고 싶은 책을 찾아보세요!"
        />
        <div className="my-6">
          {bookInfo.length > 0 ? (
            <div className="flex flex-col gap-6">
              <FilterBar first="책 제목" second="작가" onChange={handleFilterChange} />
              <div className="grid grid-cols-3 gap-7 overflow-y-auto">
                {bookInfo.map((book) => (
                  <BookInfo bookInfo={book} key={book.isbn} onClick={() => goToStep2(book)} />
                ))}
              </div>
            </div>
          ) : (
            <ReviewAdd
              title={'독립 출판물에 대한 리뷰를\n남기고 싶으신가요?'}
              onClick={() => nav('/booksnap/create/indi/1')}
              color="pink"
            />
          )}
        </div>

        {!isEnd ? (
          <div className="mb-7 flex w-full items-center justify-center">
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
