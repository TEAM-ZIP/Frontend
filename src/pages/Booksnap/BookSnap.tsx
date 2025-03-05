import { useEffect, useRef, useState } from 'react';
import FilterBar, { FilterType } from '../../components/Booksnap/FilterBar';
import ReviewPreview from '../../components/Booksnap/ReviewPreview';
import { BooksnapPreview } from '../../model/booksnap.model';
import Loading from '../Loading';
import WriteButton from '../../components/Booksnap/WriteButton';
import { getReview } from '../../api/booksnap.api';

const BookSnap = () => {
  const [filter, setFilter] = useState<FilterType>('createdAt');
  const [review, setReview] = useState<BooksnapPreview[]>([]);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const isLastRef = useRef<boolean>(false);

  // 리뷰 목록 받아오기
  const getReviews = async () => {
    try {
      const data = await getReview(filter, page);
      setReview((prev) => (page === 1 ? data.data.booksnapPreview : [...prev, ...data.data.booksnapPreview]));
      setIsLast(data.data.last);
      setIsBottom(false);
    } catch (error) {
      console.error('리뷰를 불러오는 중 에러 발생:', error);
    }
  };

  // filter가 변경될 때 상태 초기화 및 getReviews 호출
  useEffect(() => {
    setReview([]);
    setIsLast(false);
    setIsBottom(false);

    if (page !== 1) {
      setPage(1); // page가 1이 아니면 1로 초기화 (getReviews는 page가 바뀔 때 호출됨)
    } else {
      getReviews(); // page가 1이면 바로 getReviews 호출
    }
  }, [filter]);

  // page가 변경될 때만 getReviews 호출
  useEffect(() => {
    if (page !== 1 || review.length === 0) {
      // 🔄 리뷰가 없거나 페이지가 1이 아닐 때만 호출
      getReviews();
    }
  }, [page]);

  // isLast 업데이트 시 참조 업데이트
  useEffect(() => {
    isLastRef.current = isLast;
  }, [isLast]);

  // 바닥 감지
  const detectBottom = () => {
    if (mainRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
      return scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 1;
    }
    return false;
  };

  // 스크롤이 바닥에 있고, 마지막 페이지가 아니면 page + 1
  const handleScrollEvent = () => {
    if (detectBottom() && !isBottom && !isLastRef.current) {
      setIsBottom(true);
      setPage((prev) => prev + 1);
    }
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', handleScrollEvent);
      return () => {
        mainRef.current?.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, []);

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div
      ref={mainRef}
      className="relative h-full overflow-y-auto scrollbar-thin scrollbar-none scrollbar-track-transparent"
    >
      <div className="flex flex-col">
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="mt-8 flex flex-col gap-6 px-8 py-8">
          {review.map((preview, index) => (
            <ReviewPreview review={preview} key={index} />
          ))}
        </div>
        <WriteButton />
      </div>
    </div>
  );
};

export default BookSnap;
