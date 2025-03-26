import Image1 from '../../../public/icons/zip/image1.svg?react';
import Image2 from '../../../public/icons/zip/image2.svg?react';
import Image3 from '../../../public/icons/zip/image3.svg?react';

const Box = () => {
  return (
    <div className="relative">
      {/* 가로 스크롤 가능한 영역 */}
      <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
        <div className="flex gap-[10px] after:w-[20px] after:flex-shrink-0 after:content-['']">
          {/* 첫 번째 박스 */}
          <div className="relative">
            <Image1 className="w-[130px]" />
            <p className="absolute inset-0 flex items-center justify-center px-2 text-left text-[18px] font-bold leading-6 text-white">
              나에게
              <br />잘 맞는 <br />
              서점 찾아보기
            </p>
          </div>

          {/* 두 번째 박스 - 스타일 다르게 가능 */}
          <div className="relative">
            <Image2 className="w-[130px]" />
            <p className="items-strat absolute inset-0 flex justify-end whitespace-pre-line px-2 pt-8 text-right text-[18px] font-bold leading-6 text-white">
              유명 연예인들의 <br />
              추천도서
            </p>
          </div>

          {/* 세 번째 박스 */}
          <div className="relative">
            <Image3 className="w-[130px]" />
            <p className="absolute inset-0 flex items-end justify-start pb-4 pl-4 text-left text-[18px] font-bold leading-6 text-white">
              나의 <br /> 책 읽는 속도 <br /> 알아보기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
