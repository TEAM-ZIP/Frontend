import { FaStar } from 'react-icons/fa';
import { BooksnapPreview } from '../../model/booksnap.model';
import { timeAgo } from '../../utils/timeDifference';
import { IoMdThumbsUp } from 'react-icons/io';
import ButtonShort from '../Button/ButtonShort';
import { useState } from 'react';

interface ReviewPreviewProps {
  review: BooksnapPreview;
}

const ReviewPreview = ({ review }: ReviewPreviewProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(review.isLiked);
  const [likeCount, setLikeCount] = useState<number>(review.like);

  // 좋아요 관리
  const handleLike = () => {
    const newLike = !isLiked;
    setLikeCount((prev) => (newLike ? +prev + 1 : +prev - 1));
    setIsLiked(newLike);

    // 좋아요 api 요청
    // if (newLike) {
    //   postLike(review.bookReviewId).then((data) => {
    //     console.log('좋아요 성공');
    //   });
    // } else {
    //   deleteLike(revaiew.bookReviewId).then((data) => {
    //     console.log('좋아요 취소 성공');
    //   });
    // }
  };
  return (
    <div
      className="w-full rounded-[10px] border-[0.5px] border-solid border-main_2"
      style={{ boxShadow: '0px 4px 4px 0px #DBE5FF, 5px 0px 4px 0px #DBE5FF' }}
    >
      {/* 유저 정보 */}
      <div className="flex items-center justify-between p-[10px] text-gray_2">
        <p className="text-body4 font-medium tracking-large">{review.userName}</p>
        <div className="flex items-center gap-2">
          <p className="text-[13px] font-light tracking-normal">{timeAgo(review.createdAt)}</p>
          <div className="h-1 w-1 rounded-full bg-gray_2" />
          <div className="flex items-center gap-[3px]">
            <IoMdThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-main_1' : ''}`} onClick={handleLike} />
            <p className="text-[13px] font-light tracking-normal">{likeCount}</p>
          </div>
        </div>
      </div>
      {/* 책 정보 */}
      <div className="flex gap-6 bg-gradient-to-b from-[#DBE5FF] to-[#FFF] px-4 py-3">
        <img
          src={review.bookInfo.bookImageUrl}
          className="w-[80px]"
          style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
        />
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-1 tracking-normal text-gray_2">
            {/* 제목 */}
            <p className="text-[15px] font-medium tracking-large">{review.bookInfo.title}</p>
            {/* 저자 */}
            <div className="flex items-center gap-1">
              {review.bookInfo.authors.map((author, i) => (
                <div key={i} className="flex items-center text-[13px] font-light text-gray_2">
                  {author}
                  {i + 1 !== review.bookInfo.authors.length && (
                    <div className="ml-1 h-[3px] w-[3px] rounded-full bg-gray_2" />
                  )}
                </div>
              ))}
            </div>
            {/* 별점 */}
            <div className="flex items-center gap-1">
              <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
              <p className="text-[13px] tracking-[-0.48px] text-gray_2">{review.rating}</p>
            </div>
          </div>
          {/* 책 담기 버튼 */}
          <div className="flex justify-end">
            <ButtonShort type="book" />
          </div>
        </div>
      </div>
      {/* 리뷰 */}
      <div className="mx-4 border-t-[1px] py-[10px]">
        <p className="text-[13px] font-light tracking-normal text-gray_2">{review.review}</p>
      </div>
    </div>
  );
};

export default ReviewPreview;
