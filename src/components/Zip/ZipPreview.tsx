import { FaHeart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import ZipDetail from '../../pages/Zip/ZipDetail';
import { getZipPreview } from '../../model/zip.model';
import { BOOKSTORE_OPTIONS } from '../../pages/Zip/Zip';
import { useState } from 'react';
import { likeZip } from '../../api/zip.api';
import toast from 'react-hot-toast';

interface ZipPreviewProps {
  bookstore: getZipPreview;
  index: number;
}

const ZipPreview = ({ bookstore, index }: ZipPreviewProps) => {
  const { setBottomSheet } = useBottomSheetStore();
  const [isLiked, setIsLiked] = useState<boolean>(bookstore.liked);

  const openDetail = () => {
    setBottomSheet(({ currentState }) => <ZipDetail currentState={currentState} />, '서점 상세 정보');
  };

  const handleLike = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!localStorage.getItem('accessToken')) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    const newLike = !isLiked;
    setIsLiked(newLike);

    likeZip(bookstore.bookstoreId).then((data) => {
      console.log('좋아요 성공');
    });
  };

  // 카테고리 이름 변환
  const getLabelByKey = (key: string) => {
    const option = BOOKSTORE_OPTIONS.find((option) => option.key === key);
    return option ? option.label : '';
  };

  // 배경색 결정
  const bgColor = index % 2 == 0 ? '#F6ECC9' : '#C1D201';

  return (
    <div
      className={`mt-4 flex w-full items-center justify-between rounded-[40px] px-8 py-7`}
      style={{ backgroundColor: bgColor }}
      onClick={openDetail}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[12px] tracking-[-0.48px] text-[#706A6A]">
          {bookstore.address.length > 27 ? bookstore.address.substring(0, 27) + '⋯' : bookstore.address}
        </p>

        <div className="flex items-center gap-2">
          <h3 className="text-[17px] tracking-[-0.56px] text-[#1E1E1E]">{bookstore.name}</h3>
          <div className="flex items-center gap-[2px]">
            <FaStar className="h-[10px] w-[10px] fill-[#706A6A70]" />
            <p className="text-[11px] tracking-[-0.44px] text-[#979797]">{bookstore.rating}</p>
          </div>
          <div className="h-[10px] w-[1px] bg-[#D9D9D9]"></div>
          <p className="text-[12px] tracking-[-0.48px] text-[#979797]">{bookstore.keyword}</p>
        </div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
        <FaHeart className={`h-3 w-3 ${isLiked ? 'fill-orange' : 'fill-white'} bg-black`} onClick={handleLike} />
      </div>
    </div>
  );
};

export default ZipPreview;
