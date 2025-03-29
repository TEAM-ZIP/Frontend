import { FaClock, FaHeart, FaStar } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';

const ZipInfo = () => {
  return (
    <div className="bg-yellow mt-4 flex w-full flex-col items-center gap-4 rounded-[40px] px-7 py-5">
      {/* 서점 이름 */}
      <h3 className="text-[15px] font-semibold text-bg">하늘밭봄</h3>
      {/* 서점 상세 및 좋아요 */}
      <div className="flex w-full justify-between">
        <div className="flex flex-col text-[13px] leading-[18px]">
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
          <div className="flex items-center gap-[6px]">
            <div className="flex items-center gap-1">
              <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
              <p className="text-gray_1">4.3</p>
            </div>
            <div className="h-[10px] w-[1px] bg-[#D9D9D9]"></div>
            <p className="text-gray_1">인문서적</p>
          </div>
          {/* 위치 */}
          <p className="text-gray_1">인천 연수구 청능대로113번길 37</p>
        </div>
        {/* 좋아요 */}
        <div className="flex flex-col items-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bg">
            <FaHeart className="h-3 w-3 fill-orange" />
          </div>
          <p className="text-[12px] text-gray_1">12</p>
        </div>
      </div>
      <p className="text-[13px] leading-4 text-gray_1">
        다양한 책과 함께 카페, 편안한 독서 공간을 제공하여 독서와 힐링을 동시에 즐길 수 있는 서점
      </p>
    </div>
  );
};

export default ZipInfo;
