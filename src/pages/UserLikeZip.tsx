import { FaHeart } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import ZipPreview from '../components/ZipPreview';

export default function userLikeZip() {
  return (
    <div className="flex mt-[15px] items-center justify-center w-full flex-col px-[30px] mb-[70px]">
      {/* 제목 및 개수 */}
      <div className="flex items-center justify-center gap-2">
        <div className="rounded-full border-[0.5px] border-[#BCB3B3] w-5 h-5 items-center flex justify-center">
          <FaHeart className="w-3 h-3 fill-red_1" />
        </div>
        <div className="text-main_1 text-[16px] font-medium">내가 찜한 서점</div>
      </div>
      {/* 개수 */}
      <div className="flex items-center gap-1 mt-1">
        <FaLocationDot className="w-3 h-3 fill-[#CFCCD4]" />
        <div className="text-[13px] text-[#CFCCD4] font-medium">12개</div>
      </div>
      {/* 필터 */}
      <div className="mt-[11px] flex justify-start items-start w-full border-b-[0.5px] border-[#979797]">
        <div className="text-[14px] p-2 tracking-[-0.48px]">전체</div>
        <div className="text-[14px] p-2 tracking-[-0.48px]">카페가 있는 서점</div>
        <div className="text-[14px] p-2 tracking-[-0.48px]">독립서점</div>
        <div className="text-[14px] p-2 tracking-[-0.48px]">아동서점</div>
      </div>
      {/* 서점들 */}
      <ZipPreview />
      <ZipPreview />
      <ZipPreview />
      <ZipPreview />
      <ZipPreview />
      <ZipPreview />
    </div>
  );
}
