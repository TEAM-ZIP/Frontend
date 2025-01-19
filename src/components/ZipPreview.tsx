import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const ZipPreview = () => {
  return (
    <div className="border-b-[0.5px] border-main_2 py-3 px-5 flex flex-col w-full ">
      {/* 서점 이름 & 찜 버튼 */}
      <div className="flex justify-between">
        <p className="text-main_1 text-[14px] font-bold tracking-[-0.56px]">진시황 서점</p>
        <div className="rounded-full border-[0.5px] border-[#BCB3B3] w-5 h-5 items-center flex justify-center">
          <FaHeart className="w-3 h-3 fill-red_1" />
        </div>
      </div>
      {/* 별점 & 카테고리 */}
      <div className="mt-[10px] flex items-center gap-[6px]">
        <div className="flex gap-1 items-center">
          <FaStar className="w-[10px] h-[10px] fill-[#0000008A]" />
          <p className="text-[12px] tracking-[-0.48px] text-[#979797]">4.3</p>
        </div>
        <div className="w-[1px] h-[10px] bg-[#D9D9D9]"></div>
        <p className="text-[12px] tracking-[-0.48px] text-[#979797]">카페가 있는 서점</p>
      </div>
      {/* 주소 */}
      <p className="text-[12px] tracking-[-0.48px] text-[#979797]">인천 연수구 청능대로113번길 37</p>
    </div>
  );
};

export default ZipPreview;
