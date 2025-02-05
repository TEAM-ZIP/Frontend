import { IoIosArrowDown } from 'react-icons/io';
import ZipPreview from '../../components/ZipPreview';
import { useState } from 'react';
import Ping from '../../../public/icons/zip/ping.svg?react';

interface SearchZipProps {
  searchResults: any[];
  currentState: string;
}

const FILTER_OPTIONS = [
  { key: 'distance', label: '거리 순' },
  { key: 'like', label: '찜한 순' },
  { key: 'star', label: '별점 순' },
] as const;

export default function SearchZip({ searchResults, currentState }: SearchZipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<'distance' | 'like' | 'star'>('distance');

  const handleFilterClick = (key: 'distance' | 'like' | 'star') => {
    setCurrentFilter(key);
    setIsOpen(false);
  };

  return (
    <div className={`flex w-full flex-col px-[32px] ${currentState == 'max' ? 'pt-[10px]' : 'pt-[28px] '}`}>
      {/* 필터 */}
      <div
        className="bg-main_2 w-[80px] h-[26px] rounded-[10px] ml-[12px] border border-main_1 pl-[17px] flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[12px]">{FILTER_OPTIONS.find((option) => option.key === currentFilter)?.label}</p>
        <IoIosArrowDown className="w-3 h-3" />
      </div>
      {isOpen && (
        <div className="absolute w-[80px] bg-[#F0F4FF] left-11 mt-[33px] rounded-[10px] border border-main_1">
          {FILTER_OPTIONS.map((option, index) => (
            <div
              key={option.key}
              className={`w-full py-[2px] text-[12px] ${
                index !== FILTER_OPTIONS.length - 1 ? 'border-b-[0.5px] border-main_1' : ''
              } text-[#979797] cursor-pointer`}
              onClick={() => handleFilterClick(option.key)}
            >
              <p className="ml-[17px]">{option.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full bg-[#979797] h-[0.5px] mt-[12px]"></div>
      {/* 검색결과 */}
      {searchResults[0] == '' ? (
        <div className="flex flex-col items-center justify-center w-full">
          <Ping className="mt-[30px] mb-[5px]" />
          <p className="text-[#979797] text-[14px]">검색된 서점이 없어요!</p>
        </div>
      ) : (
        <>
          <ZipPreview />
          <ZipPreview />
        </>
      )}
    </div>
  );
}
