import { FaHeart } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Ping from '../../../public/icons/zip/ping.svg?react';
import { useEffect, useState } from 'react';
import { getZipPreview } from '../../model/zip.model';
import ZipPreview from '../../components/Zip/ZipPreview';

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

interface useLikeZipProps {
  bookstoreList: getZipPreview[];
  currentState: string;
}

export default function userLikeZip({ currentState, bookstoreList }: useLikeZipProps) {
  const [isSelected, setIsSelected] = useState<FilterType>(FILTER_NAME.ALL);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-[30px] ${currentState == 'max' ? '' : 'pt-[15px]'}`}
    >
      {/* 제목 및 개수 */}
      <div className="flex items-center justify-center gap-2">
        {currentState !== 'max' && (
          <>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E1E1E]">
              <FaHeart className="h-3 w-3 fill-orange" />
            </div>
            <div className="text-[20px] font-bold text-white">내가 찜한 서점</div>
          </>
        )}
      </div>
      {/* 서점들 */}
      <div data-scrollable className="z-40 flex max-h-full w-full flex-col items-start overflow-y-auto">
        {bookstoreList.length == 0 ? (
          <div className="flex w-full flex-col items-center justify-center">
            <Ping className="mb-[5px] mt-[30px]" />
            <p className="text-[14px] text-[#979797]">아직 찜한 서점이 없어요!</p>
          </div>
        ) : (
          bookstoreList.map((zip, index) => <ZipPreview key={index} bookstore={zip} index={index} />)
        )}
      </div>
    </div>
  );
}
