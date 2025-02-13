import ButtonShort from '../../components/Button/ButtonShort';
import ZipReview from '../../components/Zip/ZipReview';
import { useNavigate } from 'react-router-dom';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import ZipInfo from '../../components/Zip/ZipInfo';

interface ZipDetailProps {
  currentState: string;
}

const ZipDetail = ({ currentState }: ZipDetailProps) => {
  const nav = useNavigate();
  const { setBottomSheet } = useBottomSheetStore();

  const handleWriteReview = () => {
    setBottomSheet(({ currentState }) => <ZipDetail currentState={currentState} />, '서점 상세 정보');
    nav('create-review');
  };

  return (
    <div className={`flex w-full flex-col px-[32px] pt-[32px] text-base tracking-normal`}>
      {/* 서점 정보 */}
      <ZipInfo />
      {/* 한줄소개 */}
      <div className="flex flex-col gap-[10px] border-b-[0.5px] border-gray_1 py-[10px]">
        <p className="text-[14px] font-medium text-gray_1">한 줄 소개</p>
        <p className="text-[13px] text-gray_1">
          다양한 책과 함께 카페, 편안한 독서 공간을 제공하여 독서와 힐링을 동시에 즐길 수 있는 서점
        </p>
      </div>
      <div>
        {/* 리뷰 쓰기 */}
        <div className="mt-5 flex justify-between text-[13px]">
          <div className="flex items-center gap-4">
            <p>• 최신 순</p>
            <p className="text-gray_1">• 별점 순</p>
          </div>
          <ButtonShort type="review" onClick={handleWriteReview} />
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
