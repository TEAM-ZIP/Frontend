import { FaClock, FaHeart, FaStar } from 'react-icons/fa';
import { IoIosCall } from 'react-icons/io';
import { zipPreview } from '../../model/zip.model';
import toast from 'react-hot-toast';
import { likeZip } from '../../api/zip.api';
import { useState } from 'react';

interface ZipInfoProps {
  bookstoreInfo: zipPreview;
}

const ZipInfo = ({ bookstoreInfo }: ZipInfoProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(bookstoreInfo.liked);

  const handleLike = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    if (!localStorage.getItem('accessToken')) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    const newLike = !isLiked;
    setIsLiked(newLike);

    likeZip(bookstoreInfo.bookstoreId).then((data) => {
      console.log('좋아요 성공');
    });
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4 rounded-[40px] bg-yellow px-7 py-5">
      {/* 서점 이름 */}
      <h3 className="text-[15px] font-semibold text-bg">{bookstoreInfo.name}</h3>
      {/* 서점 상세 및 좋아요 */}
      <div className="flex w-full justify-between">
        <div className="flex flex-col text-[13px] leading-[18px]">
          {/* 전화번호 */}
          <div className="flex items-center gap-[2px]">
            <IoIosCall className="h-[12px] w-[12px] fill-[#0000008A]" />
            <p className="text-gray_1">{bookstoreInfo.phone}</p>
          </div>
          {/* 영업시간 */}
          <div className="flex items-center gap-[4px]">
            <FaClock className="h-[10px] w-[10px] fill-[#0000008A]" />
            <p className="break-keep text-gray_1">
              {bookstoreInfo.hours ? bookstoreInfo.hours : '영업시간 정보가 없습니다.'}
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <div className="flex items-center gap-1">
              <FaStar className="h-[10px] w-[10px] fill-[#0000008A]" />
              <p className="text-gray_1">{bookstoreInfo.rating}</p>
            </div>
            <div className="h-[10px] w-[1px] bg-[#D9D9D9]"></div>
            <p className="text-gray_1">{bookstoreInfo.keyword}</p>
          </div>
          {/* 위치 */}
          <p className="text-gray_1">{bookstoreInfo.address}</p>
        </div>
        {/* 좋아요 */}
        <div className="flex flex-col items-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bg" onClick={handleLike}>
            <FaHeart className={`h-3 w-3 ${isLiked ? 'fill-orange' : 'fill-white'}`} />
          </div>
          <p className="text-[12px] text-gray_1">12</p>
        </div>
      </div>
      <p className="flex self-start break-keep text-[13px] leading-4 text-gray_1">{bookstoreInfo.description}</p>
    </div>
  );
};

export default ZipInfo;
