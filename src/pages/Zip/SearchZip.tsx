import { IoIosArrowDown } from 'react-icons/io';
import ZipPreview from '../../components/Zip/ZipPreview';
import { useState } from 'react';
import Ping from '../../../public/icons/zip/ping.svg?react';
import { getZipPreview } from '../../model/zip.model';

interface SearchZipProps {
  searchResults: getZipPreview[];
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

  console.log(searchResults);
  console.log(currentState);

  return (
    <div className={`flex w-full flex-col px-[32px] ${currentState == 'max' ? 'pt-[10px]' : 'pt-[28px]'}`}>
      {/* 필터 */}
      <div
        className="ml-[12px] flex h-[26px] w-[80px] items-center gap-1 rounded-[10px] border border-main_1 bg-main_2 pl-[17px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[12px]">{FILTER_OPTIONS.find((option) => option.key === currentFilter)?.label}</p>
        <IoIosArrowDown className="h-3 w-3" />
      </div>
      {isOpen && (
        <div className="absolute left-11 mt-[33px] w-[80px] rounded-[10px] border border-main_1 bg-[#F0F4FF]">
          {FILTER_OPTIONS.map((option, index) => (
            <div
              key={option.key}
              className={`w-full py-[2px] text-[12px] ${
                index !== FILTER_OPTIONS.length - 1 ? 'border-b-[0.5px] border-main_1' : ''
              } cursor-pointer text-[#979797]`}
              onClick={() => handleFilterClick(option.key)}
            >
              <p className="ml-[17px]">{option.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-[12px] h-[0.5px] w-full bg-[#979797]"></div>
      {/* 검색결과 */}
      {searchResults.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center">
          <Ping className="mb-[5px] mt-[30px]" />
          <p className="text-[14px] text-[#979797]">검색된 서점이 없어요!</p>
        </div>
      ) : (
        searchResults.map((zip, index) => <ZipPreview key={index} bookstore={zip} />)
      )}
    </div>
  );
}
