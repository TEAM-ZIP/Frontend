import { FaHeart } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Ping from '../../public/icons/zip/ping.svg?react';
import ZipPreview from '../components/ZipPreview';
import { useEffect, useState } from 'react';

export const FILTER_NAME = {
  ALL: 'all',
  INDIE: 'indie',
  CHILDREN: 'children',
  CAFE: 'cafe',
} as const;

const FILTER_OPTIONS = [
  { key: FILTER_NAME.ALL, label: '전체' },
  { key: FILTER_NAME.INDIE, label: '독립서점' },
  { key: FILTER_NAME.CAFE, label: '카페가 있는 서점' },
  { key: FILTER_NAME.CHILDREN, label: '아동서점' },
] as const;

type FilterType = (typeof FILTER_NAME)[keyof typeof FILTER_NAME];

export default function userLikeZip() {
  const [isSelected, setIsSelected] = useState<FilterType>(FILTER_NAME.ALL);
  const [bookstoreList, setBookstoreList] = useState<string>('');

  useEffect(() => {
    // 서점 목록 받아오기
  }, [isSelected]);

  return (
    <div className="flex pt-[15px] items-center justify-center w-full flex-col px-[30px] h-full">
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
        {FILTER_OPTIONS.map(({ key, label }) => (
          <div
            key={key}
            className={`text-[14px] p-2 tracking-[-0.48px] ${isSelected === key ? 'text-black' : 'text-[#979797]'}`}
            onClick={() => setIsSelected(key)}
          >
            {label}
          </div>
        ))}
      </div>
      {/* 서점들 */}
      <div className="w-full overflow-y-auto scrollbar-none items-center justify-center flex flex-col">
        {bookstoreList !== '' ? (
          <ZipPreview />
        ) : (
          <>
            <Ping className="mt-[30px] mb-[5px]" />
            <p className="text-[#979797] text-[14px]">아직 찜한 서점이 없어요!</p>
          </>
        )}
      </div>
    </div>
  );
}
