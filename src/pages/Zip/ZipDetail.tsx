import { FaHeart, FaStar } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { FaClock } from 'react-icons/fa';
import ButtonShort from '../../components/ButtonShort';
import ZipReview from '../../components/ZipReview';

interface ZipDetailProps {
  currentState: string;
}

const ZipDetail = ({ currentState }: ZipDetailProps) => {
  return (
    <div className={`flex w-full flex-col px-[32px] pt-[32px] text-base tracking-normal`}>
      {/* 서점 정보 */}
      <div className="flex justify-between border-b-[0.5px] border-main_2 pb-[18px]">
        <div className="flex flex-col">
          {/* 서점 이름 */}
          <p className="mb-[2px] text-[14px] font-bold tracking-[-0.56px] text-main_1">진시황 서점</p>
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
      {/* 한줄소개 */}
      <div className="flex flex-col gap-[10px] border-b-[0.5px] border-gray_1 py-[10px]">
        <p className="text-[13px] font-medium text-gray_1">한 줄 소개</p>
        <p className="text-gray_1">
          다양한 책과 함께 카페, 편안한 독서 공간을 제공하여 독서와 힐링을 동시에 즐길 수 있는 서점
        </p>
      </div>
      <div>
        {/* 리뷰 쓰기 */}
        <div className="mt-5 flex justify-between">
          <div className="flex items-center gap-4">
            <p>• 최신 순</p>
            <p className="text-gray_1">• 별점 순</p>
          </div>
          <ButtonShort type="review" />
        </div>
        {/* 리뷰 보여주기 */}
        <div className="mt-[2px]">
          <ZipReview />
          <ZipReview />
          <ZipReview />
          <ZipReview />
        </div>
      </div>
    </div>
  );
};

export default ZipDetail;
