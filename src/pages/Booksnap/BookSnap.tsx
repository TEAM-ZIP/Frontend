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
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const isLastRef = useRef<boolean>(false);

  const getReviews = () => {
    return getReview(filter, page).then((data) => {
      setReview((prev) => (prev ? [...prev, ...data.data.booksnapPreview] : data.data.booksnapPreview));
      setIsLast(data.data.last);
    });
  };

  useEffect(() => {
    isLastRef.current = isLast;
  }, [isLast]);

  useEffect(() => {
    setPage(0);
    setReview([]);
    setIsLast(false);
  }, [filter]);

  const detectBottom = () => {
    if (mainRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
      return scrollTop + clientHeight >= scrollHeight - 1;
    }
    return false;
  };

  const handleScrollEvent = () => {
    if (detectBottom() && !isBottom && !isLastRef.current) {
      setIsBottom(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', handleScrollEvent);
      return () => {
        mainRef.current?.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, []);

  useEffect(() => {
    getReviews().then(() => setIsBottom(false));
  }, [page]);

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div ref={mainRef} className="h-full overflow-y-auto scrollbar-thin scrollbar-none scrollbar-track-transparent">
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
