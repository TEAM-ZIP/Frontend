import { useEffect, useState } from 'react';
import FilterBar, { FilterType } from '../../components/Booksnap/FilterBar';
import ReviewPreview from '../../components/Booksnap/ReviewPreview';
import { BooksnapPreview } from '../../model/booksnap.model';
import Loading from '../Loading';
import WriteButton from '../../components/Booksnap/WriteButton';
import { getReview } from '../../api/booksnap.api';

const BookSnap = () => {
  const [filter, setFilter] = useState<FilterType>('Latest');
  const [review, setReview] = useState<BooksnapPreview[]>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    getReview(page, 10).then((data) => {
      setPage((prev) => prev + 1);
      setReview(data.data.booksnapPreview);
    });
  }, []);

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div className="flex flex-col">
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="mt-8 flex flex-col gap-6 px-8 py-8">
        {review.map((preview, index) => (
          <ReviewPreview review={preview} key={index} />
        ))}
      </div>
      <WriteButton />
    </div>
  );
};

export default BookSnap;
