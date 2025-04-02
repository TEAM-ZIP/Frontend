import ButtonShort from '../../components/Button/ButtonShort';
import ZipReview from '../../components/Zip/ZipReview';
import { useNavigate } from 'react-router-dom';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import ZipInfo from '../../components/Zip/ZipInfo';
import FilterBar from '../../components/Common/FilterBar';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import BookInfo from '../../components/Booksnap/BookInfo';
import { getZipDetail } from '../../api/zip.api';
import { zipPreview } from '../../model/zip.model';
import NoBookStoreResult from '../../components/Zip/NoBookStoreResult';
import NoResult from '../../components/Booksnap/NoResult';

interface ZipDetailProps {
  currentState: string;
  id: number;
}

const ZipDetail = ({ currentState, id }: ZipDetailProps) => {
  const nav = useNavigate();
  const { setBottomSheet } = useBottomSheetStore();
  const [type, setType] = useState('리뷰');
  const [searchWord, setSearchWord] = useState('');
  const [bookstoreInfo, setBookstoreInfo] = useState<zipPreview>();
  const [reviewList, setReviewList] = useState([]);

  const handleWriteReview = () => {
    setBottomSheet(({ currentState }) => <ZipDetail currentState={currentState} id={id} />, '서점 상세 정보');
    nav('create-review');
  };

  useEffect(() => {
    getZipDetail(id).then((data) => {
      setBookstoreInfo(data.data.bookstoreDetail);
      setReviewList(data.data.reviewList);
    });
  }, []);

  const handleFilterChange = (selected: string) => {
    setType(selected);
    // 리뷰 가져오기
  };

  const handleSearch = () => {
    // 보유 서적 받아오기
  };

  const handleBookInfo = () => {};

  return (
    <div className={`flex w-full flex-col gap-7 px-[27px] pt-4 text-base tracking-normal`}>
      {/* 서점 정보 */}
      {bookstoreInfo && <ZipInfo bookstoreInfo={bookstoreInfo} />}
      {/* 리뷰 및 보유서적 */}
      <div>
        <FilterBar first="리뷰" second="보유 서적" onChange={handleFilterChange} color="bg-orange" />
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
              {reviewList.length > 0 ? (
                reviewList.map((review) => <ZipReview />)
              ) : (
                <NoBookStoreResult firstText="아직 등록된 리뷰가 없어요!" type="book" />
              )}
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
              {bookstoreInfo ? (
                <div className="flex flex-col gap-6">
                  <FilterBar first="책 제목" second="작가" onChange={handleFilterChange} />
                  {/* <div className="grid grid-cols-3 gap-7 overflow-y-auto">
                    {bookstoreInfo.map((book) => (
                      <BookInfo bookInfo={book} key={book.bookId} onClick={handleBookInfo} />
                    ))}
                  </div> */}
                </div>
              ) : (
                <NoResult text="검색 결과가 없어요!" />
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
