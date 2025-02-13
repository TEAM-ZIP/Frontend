import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import ZipDetail from '../../pages/Zip/ZipDetail';

const ZipPreview = () => {
  const { setBottomSheet } = useBottomSheetStore();

  const openDetail = () => {
    setBottomSheet(({ currentState }) => <ZipDetail currentState={currentState} />, '서점 상세 정보');
  };

  return (
    <div className="flex w-full flex-col border-b-[0.5px] border-main_2 px-5 py-3" onClick={openDetail}>
      {/* 서점 이름 & 찜 버튼 */}
      <div className="flex justify-between">
        <p className="text-[14px] font-bold tracking-[-0.56px] text-main_1">진시황 서점</p>
        <div className="flex h-5 w-5 items-center justify-center rounded-full border-[0.5px] border-[#BCB3B3]">
          <FaHeart className="h-3 w-3 fill-red_1" />
        </div>
      </div>
      {/* 별점 & 카테고리 */}
      <div className="mt-[10px] flex items-center gap-[6px]">
        <div className="flex items-center gap-1">
          <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
          <p className="text-[12px] tracking-[-0.48px] text-[#979797]">4.3</p>
        </div>
        <div className="h-[10px] w-[1px] bg-[#D9D9D9]"></div>
        <p className="text-[12px] tracking-[-0.48px] text-[#979797]">카페가 있는 서점</p>
      </div>
      {/* 주소 */}
      <p className="text-[12px] tracking-[-0.48px] text-[#979797]">인천 연수구 청능대로113번길 37</p>
    </div>
  );
};

export default ZipPreview;
