import { FaHeart } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Ping from '../../../public/icons/zip/ping.svg?react';
import ZipPreview from '../../components/Zip/ZipPreview';
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

export default function userLikeZip({ currentState }: { currentState: string }) {
  const [isSelected, setIsSelected] = useState<FilterType>(FILTER_NAME.ALL);
  const [bookstoreList, setBookstoreList] = useState<string>('');

  useEffect(() => {
    // 서점 목록 받아오기
  }, [isSelected]);

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-[30px] ${currentState == 'max' ? '' : 'pt-[15px]'}`}
    >
      {/* 제목 및 개수 */}
      <div className="flex items-center justify-center gap-2">
        {currentState !== 'max' && (
          <>
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-[0.5px] border-[#BCB3B3]">
              <FaHeart className="h-3 w-3 fill-red_1" />
            </div>
            <div className="text-[16px] font-medium text-main_1">내가 찜한 서점</div>
          </>
        )}
      </div>
      {/* 개수 */}
      <div className="mt-1 flex items-center gap-1">
        <FaLocationDot className="h-3 w-3 fill-[#CFCCD4]" />
        <div className="text-[13px] font-medium text-[#CFCCD4]">12개</div>
      </div>
      {/* 필터 */}
      <div className="mt-[11px] flex w-full items-start justify-start border-b-[0.5px] border-[#979797]">
        {FILTER_OPTIONS.map(({ key, label }) => (
          <div
            key={key}
            className={`cursor-pointer p-2 text-[14px] tracking-[-0.48px] ${isSelected === key ? 'text-black' : 'text-[#979797]'}`}
            onClick={() => setIsSelected(key)}
          >
            {label}
          </div>
        ))}
      </div>
      {/* 서점들 */}
      <div
        data-scrollable
        className="z-40 flex max-h-full w-full flex-col items-start overflow-y-auto"
        style={{
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
        onTouchStart={(e) => {
          console.log('터치 감지');
          e.stopPropagation();
        }} // 상위로 이벤트 전파 차단
        onTouchMove={(e) => {
          const target = e.target as HTMLElement;
          const scrollableElement = target.closest('[data-scrollable]'); // 상위 요소 중 data-scrollable 탐색
          console.log('터치 이벤트 target:', target);
          console.log('scrollableElement:', scrollableElement);

          if (scrollableElement) {
            console.log('움직임 감지');
            e.stopPropagation(); // 내부 스크롤 허용
          } else {
            e.preventDefault();
            console.log('움직임 감지 실패 - data-scrollable 요소가 없음');
          }
        }}
      >
        {bookstoreList == '' ? (
          <div className="flex w-full flex-col items-center justify-center">
            <Ping className="mb-[5px] mt-[30px]" />
            <p className="text-[14px] text-[#979797]">아직 찜한 서점이 없어요!</p>
          </div>
        ) : (
          <>
            {/* <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview />
            <ZipPreview /> */}
          </>
        )}
      </div>
    </div>
  );
}
