import { FaStar } from 'react-icons/fa';
import { BooksnapPreview } from '../../model/booksnap.model';
import { timeAgo } from '../../utils/timeDifference';
import { IoMdThumbsUp } from 'react-icons/io';
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { deleteLike, pickBook, postLike } from '../../api/booksnap.api';
import { MdBookmarkAdd } from 'react-icons/md';
import toast from 'react-hot-toast';
import BookstoreTag from './BookstoreTag';

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
    if (!localStorage.getItem('accessToken')) {
      toast.error('로그인이 필요한 서비스입니다.');
    } else {
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
    }
  };

  // 책 담기
  const handlePickBook = () => {
    if (!localStorage.getItem('accessToken')) {
      toast.error('로그인이 필요한 서비스입니다.');
    } else {
      pickBook(review.bookInfo.bookId).then((data) => {
        if (data?.success) {
          toast.success(`${review.bookInfo.title}을(를) 책장에 담았어요!`);
        } else {
          toast.error(`${data?.message}`);
        }
      });
    }
  };

  return (
    <div className="w-full rounded-[10px] bg-[#544F4F]">
      {/* 유저 정보 */}
      <div className="flex items-center justify-between p-[10px] text-white">
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
      <div className="flex flex-col gap-1 border-b-[0.5px] border-[#717171] px-4 py-[10px]">
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-white">{review.bookInfo.title}</p>
          <div className="flex items-center gap-1">
            <FaStar className="h-[11px] w-[11px] fill-white" />
            <p className="text-[14px] tracking-[-0.48px] text-white">{review.rating}</p>
          </div>
        </div>
        <p className="text-[14px] font-light tracking-normal text-white">{review.review}</p>
        <div className="mt-2 flex">
          {/* 서점 태그 */}
          {review.bookInfo?.bookStores &&
            review.bookInfo.bookStores.map((bookstore) => (
              <BookstoreTag key={bookstore.bookStoreId} name={bookstore.bookStoreName} />
            ))}
        </div>
      </div>
      {/* 좋아요 및 담기 */}
      <div className="my-2 flex justify-around text-[13px] tracking-normal text-[#DBDBDB]">
        <div className="flex flex-1 items-center justify-center gap-1" onClick={handlePickBook}>
          <MdBookmarkAdd className="h-4 w-4 fill-[#DBDBDB]" />
          <p>담기</p>
        </div>
        <div className="border-x-[0.5px] border-[#717171]"></div>
        <div className="flex flex-1 items-center justify-center gap-1" onClick={handleLike}>
          {isLiked ? (
            <IoMdHeart className="h-4 w-4 fill-[#DBDBDB]" />
          ) : (
            <IoMdHeartEmpty className="h-4 w-4 fill-[#DBDBDB]" />
          )}
          <p>좋아요</p>
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPreview;
