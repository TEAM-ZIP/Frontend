import Vector from '../../../public/icons/home/Vector.svg?react';

interface ReportStore {
  onClick: () => void;
}

const ReportStore = ({ onClick }: ReportStore) => {
  const name = localStorage.getItem('nickname');
  return (
    <div className="flex flex-col py-[10px]" onClick={onClick}>
      <div className="flex flex-col gap-[5px] p-[10px]">
        <div className="text-body1 font-bold">
          <span className="text-green">서점ZIP에 없는 독립서점</span>
          <span className="text-white">을</span>
          <p className="text-white">제보해주세요!</p>
        </div>
        <p className="text-white">{name}님의 제보가 서점ZIP을 살려요!</p>
      </div>
      <div className="flex w-full items-center justify-center gap-[20px] rounded-[20px] bg-mint px-[10px] py-[15px] text-body4">
        <p className="text-[14px] font-medium text-[#302D2D]">
          더 나은 서점ZIP 서비스를 위해 <br /> 독립 서점 제보하러 가기
        </p>
        <Vector />
      </div>
    </div>
  );
};

export default ReportStore;
