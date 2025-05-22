import { BooksnapPreview } from '../../model/booksnap.model';

interface ReviewBoxProps {
  reviews: BooksnapPreview;
}

const ReviewBox = ({ reviews }: ReviewBoxProps) => {
  return (
    <div className="w-[165px] flex-shrink-0 overflow-hidden rounded-[20px] bg-bg_2 text-white shadow-md">
      {/* 상단 텍스트 */}
      <div className="px-4 pt-4 text-[16px]">{reviews.userName}</div>

      {/* 배경 이미지 영역 */}
      <div className="relative mt-2 h-[190px] w-full overflow-hidden rounded-b-[20px]">
        {/* 흐릿한 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(${reviews.bookInfo.bookImageUrl})`,
          }}
        />

        {/* 어두운 반투명 레이어*/}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* 오버레이 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col justify-end p-4">
          <p className="break-keep text-[18px] font-bold">
            “ <br />
            {reviews.review.length > 15 ? `${reviews.review.slice(0, 15)}...` : reviews.review}
            <br />”
          </p>
          <div className="text-green-200 mt-2 flex items-center justify-between text-[12px]">
            <span>{reviews.bookInfo.title}</span>
            <span>★ {reviews.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
