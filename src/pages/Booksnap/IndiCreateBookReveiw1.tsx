import { useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import Header from '../../components/Common/Header';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import { getSearchBook } from '../../api/booksnap.api';
import MoreButton from '../../components/Booksnap/MoreButton';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/Booksnap/Step';
import ReviewAdd from '../../components/Booksnap/ReviewAdd';
import FilterBar from '../../components/Common/FilterBar';
import NoResult from '../../components/Booksnap/NoResult';

const IndiCreateBookReview = () => {
  const [searchWord, setSearchWord] = useState('');
  const [bookInfo, setBookInfo] = useState<BookDetailInfo[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const [searchType, setSearchType] = useState('책 제목');

  const handleSearch = async (isNewSearch = false, type = searchType) => {
    if (isNewSearch) setPage(1);
    const currentPage = isNewSearch ? 1 : page;
    const searchtype = type === '책 제목' ? 'title' : 'author';
    const data = await getSearchBook('indep', searchtype, searchWord, currentPage);

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
    nav('/booksnap/create/indi/2', { state: { book: book } });
  };

  return (
    <div className="flex h-full flex-col bg-bg pt-[70px]">
      {/* 헤더 */}
      <Header title="리뷰 작성하기" />
      {/* 내용 */}
      <div className="mt-[40px] flex flex-col items-center px-8">
        <Step step={1} text="리뷰를 남길 독립출판물을 골라주세요." />
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSearch={() => handleSearch(true)}
          text="리뷰를 남기고 싶은 책을 찾아보세요!"
        />
        <div className="my-6">
          {bookInfo.length > 0 ? (
            <div className="flex flex-col gap-6">
              <FilterBar first="책 제목" second="작가" onChange={handleFilterChange} color="bg-pink" />
              <div className="grid grid-cols-3 gap-7 overflow-y-auto">
                {bookInfo.map((book) => (
                  <BookInfo bookInfo={book} key={book.isbn} onClick={() => goToStep2(book)} />
                ))}
              </div>
            </div>
          ) : (
            <ReviewAdd
              title={'서점 ZIP에 등록되지 않은\n독립출판물을\n등록하고 싶나요? '}
              onClick={() => nav('/booksnap/create/book')}
              color="mint"
            />
            // <NoResult />
          )}
        </div>

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

export default IndiCreateBookReview;
