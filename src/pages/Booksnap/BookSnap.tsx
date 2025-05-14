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
import BookSearchHeader from '../../components/Header/BookSearchHeader';

const BookSnap = () => {
  const [filter, setFilter] = useState<FilterType>('createdAt');
  const [review, setReview] = useState<BooksnapPreview[]>([]);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isLastRef = useRef(false);
  const mainRef = useScrollRef();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  // 리뷰 목록 받아오기
  const getReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getReview(filter, page);
      setReview((prev) => (page === 1 ? data.data.booksnapPreview : [...prev, ...data.data.booksnapPreview]));
      setIsLast(data.data.last);
    } catch (error) {
      console.error('리뷰를 불러오는 중 에러 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 있을 때는 검색 API 호출
  useEffect(() => {
    setReview([]);
    if (query) {
      searchReview(query).then((data) => {
        setReview(data.booksnapPreview);
      });
    } else {
      getReviews();
    }
  }, [query]);

  useEffect(() => {
    if (query) return;
    setReview([]);
    setIsLast(false);

    if (page !== 1) {
      setPage(1); // page가 1이 아니면 1로 초기화 (getReviews는 page가 바뀔 때 호출됨)
    } else {
      getReviews(); // page가 1이면 바로 getReviews 호출
    }
  }, [filter]);

  // page가 바뀌면 getReviews 호출
  useEffect(() => {
    if (query) return;
    getReviews();
  }, [page]);

  // isLast 상태를 ref에도 반영
  useEffect(() => {
    isLastRef.current = isLast;
  }, [isLast]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (nearBottom && !isLastRef.current && !isLoading) {
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
  }, [mainRef, isLoading]);

  if (isLoading && review.length === 0) {
    return <Loading text="리뷰 목록을 불러오는 중입니다!" />;
  }

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div className="overflow-hidden bg-bg scrollbar-none">
      {/* 헤더 */}
      {query ? <BookSearchHeader query={query} /> : <BooksnapHeader />}
      <div className={`flex flex-col ${query ? '' : 'mt-[50px]'}`}>
        {!query && <FilterBar filter={filter} setFilter={setFilter} />}
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
