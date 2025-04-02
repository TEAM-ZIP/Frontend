import Ping from '../../../public/icons/zip/ping.svg?react';
import Book from '../../../public/icons/zip/book.svg?react';

interface NoResultProps {
  firstText: string;
  secondText?: string;
  type?: string;
}

const NoBookStoreResult = ({ firstText, secondText, type }: NoResultProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mt-[12px] h-[0.5px] w-full bg-[#979797]"></div>
      {type == 'book' ? <Book className="mb-[5px] mt-[30px]" /> : <Ping className="mb-[5px] mt-[30px]" />}
      <p className="text-[14px] text-[#979797]">{firstText}</p>
      <p className="text-[14px] font-medium leading-7 text-white">{secondText}</p>
    </div>
  );
};

export default NoBookStoreResult;
