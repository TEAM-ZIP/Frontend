import { FaStar } from 'react-icons/fa';
import image from '../../../public/icons/zip/image.png';
import { bookstoreReview } from '../../model/zip.model';

interface ZipReviewProps {
  review: bookstoreReview;
}

const ZipReview = ({ review }: ZipReviewProps) => {
  return (
    <div className="flex flex-col gap-[10px] border-b-[0.5px] border-[#D9D9D9] px-2 pb-[19px] pt-[10px] text-base tracking-normal">
      {/* 글씨영역 */}
      <div className="flex justify-between">
        {/* 이름 날짜 */}
        <div className="flex items-end gap-[10px] text-[14px]">
          <p className="text-body3 font-bold text-white">{review.nickname}</p>
          <p className="text-[13px] font-light text-gray_1">{review.createdAt.slice(0, 10)}</p>
        </div>
        {/* 별점 */}
        <div className="flex items-center gap-1">
          <FaStar className="h-[12px] w-[12px] fill-[#D9D9D9]" />
          <p className="text-[13px] font-bold text-white">{review.rating}</p>
        </div>
      </div>
      {/* 사진 및 리뷰 */}
      <div className="flex justify-between gap-4">
        <img src={review.imageUrl} className="h-[80px] w-[80px] flex-shrink-0" />
        <p className="flex-1 text-[13px] leading-5 tracking-normal text-gray_1">{review.text}</p>
      </div>
    </div>
  );
};

export default ZipReview;
