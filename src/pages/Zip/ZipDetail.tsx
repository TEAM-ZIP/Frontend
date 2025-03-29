import ButtonShort from '../../components/Button/ButtonShort';
import ZipReview from '../../components/Zip/ZipReview';
import { useNavigate } from 'react-router-dom';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import ZipInfo from '../../components/Zip/ZipInfo';
import FilterBar from '../../components/Common/FilterBar';
import { useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import BookInfo from '../../components/Booksnap/BookInfo';
import { BookDetailInfo } from '../../model/booksnap.model';
import ReviewAdd from '../../components/Booksnap/ReviewAdd';
import NoResult from '../../components/Booksnap/NoResult';

interface ZipDetailProps {
  currentState: string;
}

const ZipDetail = ({ currentState }: ZipDetailProps) => {
  const nav = useNavigate();
  const { setBottomSheet } = useBottomSheetStore();
  const [type, setType] = useState('리뷰');
  const [searchWord, setSearchWord] = useState('');
  const [bookInfo, setBookInfo] = useState<BookDetailInfo[]>([]);

  const handleWriteReview = () => {
    setBottomSheet(({ currentState }) => <ZipDetail currentState={currentState} />, '서점 상세 정보');
    nav('create-review');
  };

  const handleFilterChange = (selected: string) => {
    setType(selected);
    // 리뷰 가져오기
  };

  const handleSearch = () => {
    // 보유 서적 받아오기
  };

  const handleBookInfo = () => {};

  return (
    <div className={`flex w-full flex-col gap-7 px-[27px] pt-[32px] text-base tracking-normal`}>
      {/* 서점 정보 */}
      <ZipInfo />
      {/* 리뷰 및 보유서적 */}
      <div>
        <FilterBar first="리뷰" second="보유 서적" onChange={handleFilterChange} />
        {type == '리뷰' ? (
          <div>
            <div className="mt-5 flex justify-between text-[13px]">
              <div className="flex items-center gap-4">
                <p className="text-orange">• 최신 순</p>
                <p className="text-white">• 별점 순</p>
              </div>
              <ButtonShort type="review" onClick={handleWriteReview} />
            </div>
            {/* 리뷰 보여주기 */}
            <div className="mt-[2px]">
              <ZipReview />
              <ZipReview />
              <ZipReview />
              <ZipReview />
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <SearchBar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              onSearch={() => handleSearch()}
              text="책 제목으로 리뷰를 찾아보세요!"
            />
            <div className="my-6">
              {bookInfo.length > 0 ? (
                <div className="flex flex-col gap-6">
                  <FilterBar first="책 제목" second="작가" onChange={handleFilterChange} />
                  <div className="grid grid-cols-3 gap-7 overflow-y-auto">
                    {bookInfo.map((book) => (
                      <BookInfo bookInfo={book} key={book.isbn} onClick={handleBookInfo} />
                    ))}
                  </div>
                </div>
              ) : (
                <NoResult text="직접 리뷰를 남겨보세요!" />
              )}
            </div>
          </div>
        )}
        {/* 리뷰 쓰기 */}
      </div>
    </div>
  );
};

export default ZipDetail;
