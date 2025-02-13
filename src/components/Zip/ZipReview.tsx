import { FaStar } from 'react-icons/fa';
import image from '../../../public/icons/zip/image.png';

const ZipReview = () => {
  return (
    <div className="flex flex-col gap-[10px] border-b-[0.5px] pb-[19px] pt-[10px] text-base tracking-normal">
      {/* 글씨영역 */}
      <div className="flex flex-col gap-[3px]">
        {/* 이름 날짜 */}
        <div className="flex items-end gap-[10px] text-[13px]">
          <p className="text-body3 font-bold text-gray_1">책먹는 여우</p>
          <p className="text-[13px] font-light text-gray_1">2025.01.31</p>
        </div>
        {/* 별점 */}
        <div className="flex items-center gap-1">
          <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
          <p className="text-[13px] text-gray_1">4</p>
        </div>
        {/* 리뷰 */}
        <p className="text-[14px] leading-5 tracking-normal text-gray_1">
          요즘 자주 찾게 되는 진시황! 몰래 책 먹다가 사장님한테 들켰는데 사장님이 한 번은 봐주신대요... 사장님 진짜
          좋으신 분이세요 ㅠㅠ
        </p>
      </div>
      {/* 사진영역 */}
      <div className="relative">
        {/* 가로 스크롤 가능한 영역 */}
        <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
          <div className="flex gap-[10px] after:w-[22px] after:flex-shrink-0 after:content-['']">
            <img src={image} className="h-[80px] w-[80px] flex-shrink-0" />
            <img src={image} className="h-[80px] w-[80px] flex-shrink-0" />
            <img src={image} className="h-[80px] w-[80px] flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZipReview;
