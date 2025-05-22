import Image2 from '../../../public/icons/zip/22.svg?react';
import Image3 from '../../../public/icons/zip/image3.svg?react';
import Image4 from '../../../public/icons/zip/123.svg?react';

const Box = () => {
  return (
    <div className="relative">
      {/* 가로 스크롤 가능한 영역 */}
      <div className="mx-[-32px] overflow-x-auto px-[32px] scrollbar-hide">
        <div className="flex gap-[10px] after:w-[20px] after:flex-shrink-0 after:content-['']">
          {/* 첫 번째 박스 */}
          <div className="relative" onClick={() => window.open('https://sibf.or.kr/', '_blank')}>
            <Image2 className="h-[130px] w-[130px] rounded-3xl" />
            <p className="absolute inset-0 flex items-end justify-end whitespace-pre-line px-2 pt-8 text-right text-[18px] font-bold leading-6 text-white">
              2025 <br />
              서울국제도서전
            </p>
          </div>

          {/* 두 번째 박스 - 스타일 다르게 가능 */}
          <div
            className="relative"
            onClick={() =>
              window.open(
                'https://turquoise-dill-eee.notion.site/Pick-1fa2ab1fb8c980049788dac428d46835?pvs=4',
                '_blank',
              )
            }
          >
            <Image4 className="h-[130px] w-[130px] rounded-3xl" />
          </div>

          {/* 세 번째 박스 */}
          <div className="relative" onClick={() => window.open('https://payge.kr/speed', '_blank')}>
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
