import sunglass from '../../../public/icons/home/sunglass.png';
import hand from '../../../public/icons/home/hand.png';

const ReportBookstore = () => {
  return (
    <div className="bg-mint flex w-full items-center justify-center gap-[10px] rounded-[20px] px-[10px] py-[15px] text-body4">
      <div>
        <p className="font-medium"> To. zipzip이들 </p>
        <p>
          더 나은 서점ZIP 서비스를 위해서 <br />
          의견을 남겨주세요!
        </p>
      </div>
      <img src={sunglass} className="h-[50px] w-[50px]" />
      <img src={hand} className="h-[50px] w-[50px]" />
    </div>
  );
};

export default ReportBookstore;
