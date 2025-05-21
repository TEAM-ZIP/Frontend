import sunglass from '../../../public/icons/home/sunglass.png';
import hand from '../../../public/icons/home/hand.png';
import toast from 'react-hot-toast';

const ReportBookstore = () => {
  return (
    <div
      className="flex w-full items-center justify-center gap-[10px] rounded-[20px] bg-mint px-[10px] py-[15px] text-body4"
      onClick={() => toast.error('아직 준비중인 서비스입니다')}
    >
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
