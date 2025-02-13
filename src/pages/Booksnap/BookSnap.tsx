import { useEffect, useState } from 'react';
import FilterBar, { FilterType } from '../../components/Booksnap/FilterBar';
import ReviewPreview from '../../components/Booksnap/ReviewPreview';
import { BooksnapPreview } from '../../model/booksnap.model';
import Loading from '../Loading';

const BookSnap = () => {
  const [filter, setFilter] = useState<FilterType>('Latest');
  const [review, setReview] = useState<BooksnapPreview[]>();

  useEffect(() => {
    const mockdata = [
      {
        userName: '이구역 독서짱',
        createdAt: new Date(2025, 0, 1, 2, 3, 4, 567),
        like: '27',
        review:
          '너무 억압당하는 채로 살아가지 마세요! 병납니다. 실패에도 용기가 있다는 걸 알려주는 책입니다. 근데 주인공은 실패하는 걸 너무 두려웠습니다.',
        isLiked: true,
        bookInfo: {
          bookId: '8996991341 9788996991342',
          title: '미움받을 용기',
          thumbnail:
            'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
          authors: ['기시미 이치로', '고가 후미타케'],
          star: 4.3,
          publisher: '인플루엔셜',
        },
      },
      {
        userName: '독서왕',
        createdAt: new Date(2024, 0, 1, 2, 3, 4, 567),
        like: '5',
        review:
          '너무 억압당하는 채로 살아가지 마세요! 병납니다. 실패에도 용기가 있다는 걸 알려주는 책입니다. 근데 주인공은 실패하는 걸 너무 두려웠습니다.',
        isLiked: false,
        bookInfo: {
          bookId: '8996991341 9788996991342',
          title: '미움받을 용기',
          thumbnail:
            'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
          authors: ['기시미 이치로', '고가 후미타케'],
          star: 4.3,
          publisher: '인플루엔셜',
        },
      },
    ];

    setReview(mockdata);
  }, []);

  if (!review) {
    return <Loading text="데이터를 불러오는 데 실패했습니다!" />;
  }

  return (
    <div className="flex flex-col">
      <FilterBar filter={filter} setFilter={setFilter} />
      <div className="mt-8 flex flex-col gap-6 px-8 py-8">
        <ReviewPreview review={review[0]} />
        <ReviewPreview review={review[1]} />
        <ReviewPreview review={review[1]} />
        <ReviewPreview review={review[1]} />
      </div>
    </div>
  );
};

export default BookSnap;
