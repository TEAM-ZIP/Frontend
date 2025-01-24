import { IoIosArrowDown } from 'react-icons/io';
import ZipPreview from '../components/ZipPreview';
import { useState } from 'react';

interface SearchZipProps {
  searchResults: any[];
}

export default function SearchZip({ searchResults }: SearchZipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex w-full flex-col pt-[28px] px-[32px]">
      {/* 필터 */}
      <div
        className="bg-main_2 w-[80px] h-[26px] rounded-[10px] ml-[12px] border border-main_1 pl-[17px] flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[12px]">거리순</p>
        <IoIosArrowDown className="w-3 h-3" />
      </div>
      {isOpen && (
        <div className="absolute w-[80px] bg-[#F0F4FF] left-11 mt-[33px] rounded-[10px] border border-main_1">
          <p className="text-[12px] ml-[17px] text-[#979797] mt-[3px]">거리 순</p>
          <div className="w-full bg-main_1 mt-[2px] h-[0.5px]"></div>
          <p className="text-[12px] ml-[17px] text-[#979797] mt-[3px]">찜한 순</p>
          <div className="w-full bg-main_1 mt-[2px] h-[0.5px]"></div>
          <p className="text-[12px] ml-[17px] text-[#979797] mt-[3px] mb-[3px]">별점 순</p>
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
