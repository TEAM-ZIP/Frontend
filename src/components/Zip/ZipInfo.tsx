import { FaClock, FaHeart, FaStar } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';

const ZipInfo = () => {
  return (
    <div className="flex justify-between border-b-[0.5px] border-main_2 pb-[18px]">
      <div className="flex flex-col">
        {/* 서점 이름 */}
        <p className="mb-[2px] text-[15px] font-bold tracking-[-0.56px] text-main_1">진시황 서점</p>
        {/* 별점 및 종류 */}
        <div className="flex items-center gap-[6px]">
          <div className="flex items-center gap-1">
            <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
            <p className="text-gray_1">4.3</p>
          </div>
          <div className="h-[10px] w-[1px] bg-[#D9D9D9]"></div>
          <p className="text-gray_1">카페가 있는 서점</p>
        </div>
        {/* 전화번호 */}
        <div className="flex items-center gap-[2px]">
          <IoIosCall className="h-[12px] w-[12px] fill-[#0000008A]" />
          <p className="text-gray_1">02-0000-0000</p>
        </div>
        {/* 영업시간 */}
        <div className="flex items-center gap-[4px]">
          <FaClock className="h-[10px] w-[10px] fill-[#0000008A]" />
          <p className="text-gray_1">10:30 ~ 22:00</p>
        </div>
        {/* 위치 */}
        <p className="text-gray_1">인천 연수구 청능대로113번길 37</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-[0.5px] border-[#BCB3B3]">
          <FaHeart className="h-3 w-3 fill-red_1" />
        </div>
        <p className="text-gray_1">12</p>
      </div>
    </div>
  );
};

export default ZipInfo;
