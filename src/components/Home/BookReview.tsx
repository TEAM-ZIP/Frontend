import { useEffect, useState } from 'react';
import { getReview } from '../../api/booksnap.api';
import ReviewBox from './ReviewBox';
import { BooksnapPreview } from '../../model/booksnap.model';

const BookReview = () => {
  const [reviews, setReview] = useState<BooksnapPreview[]>([]);

  useEffect(() => {
    getReview('trend', 1).then((data) => {
      setReview(data.data.booksnapPreview.slice(0, 3)); // 배열의 첫 3개만 저장
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-col gap-[5px]">
        <p className="text-body1 font-bold text-white">ZIPZIP이들의 서점리뷰</p>
        <p className="text-body3 text-white">회원들의 솔직한 리뷰를 만나보세요</p>
      </div>
      <div className="relative">
        {/* 가로 스크롤 가능한 영역 */}
        <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
          <div className="flex gap-[10px] after:w-[20px] after:flex-shrink-0 after:content-['']">
            {reviews.map((review, index) => (
              <ReviewBox reviews={review} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReview;
