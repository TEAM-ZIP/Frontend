import { FaStar } from 'react-icons/fa';
import { BooksnapPreview } from '../../model/booksnap.model';
import { timeAgo } from '../../utils/timeDifference';
import { IoMdThumbsUp } from 'react-icons/io';
import ButtonShort from '../Button/ButtonShort';
import { useEffect, useState } from 'react';
import { deleteLike, pickBook, postLike } from '../../api/booksnap.api';
import { MdBookmarkAdd } from 'react-icons/md';

interface ReviewPreviewProps {
  review: BooksnapPreview;
}

const ReviewPreview = ({ review }: ReviewPreviewProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(review.isLiked);
  const [likeCount, setLikeCount] = useState<number>(review.like);

  useEffect(() => {
    setIsLiked(review.isLiked);
    setLikeCount(review.like);
  }, [review]);

  // 좋아요 관리
  const handleLike = () => {
    const newLike = !isLiked;
    setLikeCount((prev) => (newLike ? +prev + 1 : +prev - 1));
    setIsLiked(newLike);

    // 좋아요 api 요청
    if (newLike) {
      postLike(review.bookReviewId).then((data) => {
        console.log('좋아요 성공');
      });
    } else {
      deleteLike(review.bookReviewId).then((data) => {
        console.log('좋아요 취소 성공');
      });
    }
  };

  // 책 담기
  const handlePickBook = () => {
    pickBook(review.bookInfo.isbn).then((data) => {
      console.log('책 저장 완료');
    });
  };

  return (
    <div
      className="w-full rounded-[10px] border-[0.5px] border-solid border-main_2"
      style={{ boxShadow: '0px 4px 4px 0px #DBE5FF, 5px 0px 4px 0px #DBE5FF' }}
    >
      {/* 유저 정보 */}
      <div className="flex items-center justify-between p-[10px] text-gray_2">
        <p className="text-body4 font-medium tracking-large">{review.userName}</p>
        <p className="text-[13px] font-light tracking-normal">{timeAgo(review.createdAt)}</p>
      </div>
      {/* 책 정보 */}
      <div className="relative h-36 w-full overflow-hidden">
        {/* 책 배경 흐리게 */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${review.bookInfo.bookImageUrl})` }}
        />
        {/* 책 사진 */}
        <div className="relative z-10 mt-10 flex h-full items-center justify-center">
          <img
            src={review.bookInfo.bookImageUrl}
            className="scale-110 transform object-cover object-center shadow-md"
          />
        </div>
      </div>
      {/* 리뷰 */}
      <div className="border-gray_3 flex flex-col gap-1 border-b-[0.5px] px-4 py-[10px]">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold">{review.bookInfo.title}</p>
          <div className="flex items-center gap-1">
            <FaStar className="h-[11px] w-[11px] fill-main_3" />
            <p className="text-[14px] tracking-[-0.48px] text-main_3">{review.rating}</p>
          </div>
        </div>
        <p className="text-[14px] font-light tracking-normal text-gray_2">{review.review}</p>
      </div>
      {/* 좋아요 및 담기 */}
      <div className="my-2 flex justify-around text-[13px] tracking-normal text-gray_2">
        <div className="flex flex-1 items-center justify-center gap-1">
          <MdBookmarkAdd className="h-4 w-4 fill-gray_2" />
          <p>담기</p>
        </div>
        <div className="border-gray_3 border-x-[0.5px]"></div>
        <div className="flex flex-1 items-center justify-center gap-1">
          <IoMdThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-main_1' : ''}`} onClick={handleLike} />
          <p>좋아요</p>
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPreview;
