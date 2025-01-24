import { IoIosArrowDown } from 'react-icons/io';
import ZipPreview from '../components/ZipPreview';
import { useState } from 'react';

interface SearchZipProps {
  searchResults: any[];
}

const FILTER_OPTIONS = [
  { key: 'distance', label: '거리 순' },
  { key: 'like', label: '찜한 순' },
  { key: 'star', label: '별점 순' },
] as const;

export default function SearchZip({ searchResults }: SearchZipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<'distance' | 'like' | 'star'>('distance');

  const handleFilterClick = (key: 'distance' | 'like' | 'star') => {
    setCurrentFilter(key);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full flex-col pt-[28px] px-[32px]">
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
      <ZipPreview />
      <ZipPreview />
      <ZipPreview />
    </div>
  );
}
