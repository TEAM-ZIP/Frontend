import { IoIosArrowDown } from 'react-icons/io';
import ZipPreview from '../../components/Zip/ZipPreview';
import { useState } from 'react';
import { getZipPreview } from '../../model/zip.model';
import NoBookStoreResult from '../../components/Zip/NoBookStoreResult';

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

  return (
    <div className={`flex w-full flex-col px-[24px] ${currentState === 'max' ? 'pt-[10px]' : 'pt-[28px]'}`}>
      {/* 필터 */}
      <div
        className="ml-[12px] flex min-h-[26px] w-[80px] items-center gap-1 rounded-[50px] bg-orange pl-[17px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[12px]">{FILTER_OPTIONS.find((option) => option.key === currentFilter)?.label}</p>
        <IoIosArrowDown className="h-3 w-3" />
      </div>

      {isOpen && (
        <div className="absolute left-11 z-10 mt-[33px] w-[80px] rounded-[10px] border border-orange bg-[#FFDDD2]">
          {FILTER_OPTIONS.map((option, index) => (
            <div
              key={option.key}
              className={`w-full py-[2px] text-[12px] ${
                index !== FILTER_OPTIONS.length - 1 ? 'border-b-[0.5px] border-orange' : ''
              } cursor-pointer text-[#979797]`}
              onClick={() => handleFilterClick(option.key)}
            >
              <p className="ml-[17px]">{option.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* 검색결과 */}
      {searchResults.length === 0 ? (
        <NoBookStoreResult firstText="검색된 서점이 없어요!" secondText="독립 서점 제보하러 가기 >" />
      ) : (
        <div className="mt-4 flex flex-col">
          {searchResults.map((zip, index) => (
            <ZipPreview key={index} index={index} bookstore={zip} />
          ))}
        </div>
      )}
    </div>
  );
}
