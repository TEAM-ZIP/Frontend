import { useEffect, useRef, useState } from 'react';
import FilterBar, { FilterType } from '../../components/Booksnap/FilterBar';
import ReviewPreview from '../../components/Booksnap/ReviewPreview';
import { BooksnapPreview } from '../../model/booksnap.model';
import Loading from '../Loading';
import WriteButton from '../../components/Booksnap/WriteButton';
import { getReview, searchReview } from '../../api/booksnap.api';
import Toast from '../../components/Common/Toast';
import BooksnapHeader from '../../components/Header/BooksnapHeader';
import { useScrollRef } from '../../components/ScrollContext';
import { useSearchParams } from 'react-router-dom';

const BookSnap = () => {
  const [filter, setFilter] = useState<FilterType>('createdAt');
  const [review, setReview] = useState<BooksnapPreview[]>([]);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const isLastRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useScrollRef();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      searchReview(query).then((data) => {
        setReview(data.booksnapPreview);
      });
    }
  }, [query]);

  // 리뷰 목록 받아오기
  const getReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getReview(filter, page);
      setReview((prev) => (page === 1 ? data.data.booksnapPreview : [...prev, ...data.data.booksnapPreview]));
      setIsLast(data.data.last);
      setIsBottom(false);
    } catch (error) {
      console.error('리뷰를 불러오는 중 에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // filter가 변경될 때 상태 초기화 및 getReviews 호출
  useEffect(() => {
    if (query) return;
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
    if (query) return;

    if (page !== 1 || review.length === 0) {
      // 🔄 리뷰가 없거나 페이지가 1이 아닐 때만 호출
      getReviews();
    }
  }, [page]);

  // isLast 업데이트 시 참조 업데이트
  useEffect(() => {
    isLastRef.current = isLast;
  }, [isLast]);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isBottom && !isLastRef.current) {
        setIsBottom(true);
        setPage((prev) => prev + 1);
      }
    };

    const el = mainRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
    }

    return () => {
      el?.removeEventListener('scroll', handleScroll);
    };
  }, [mainRef, isBottom]);

  if (isLoading) {
    return <Loading text="리뷰 목록을 불러오는 중입니다!" />;
  }

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div className="overflow-hidden bg-bg scrollbar-none">
      {/* 헤더 */}
      <BooksnapHeader />
      <div className="mt-[50px] flex flex-col">
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="mt-8 flex flex-col gap-6 px-8 py-8">
          {review.map((preview, index) => (
            <ReviewPreview review={preview} key={index} />
          ))}
        </div>
        <WriteButton />
      </div>
      <Toast />
    </div>
  );
};

export default BookSnap;
