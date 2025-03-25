import MenuBookIcon from '@mui/icons-material/MenuBook';
import Bookie from '../../../public/icons/home/bookie.png';

const BookieBox = () => {
  return (
    <div className="flex w-full flex-col gap-[5px] rounded-[20px] bg-green px-[10px] pt-[15px]">
      <MenuBookIcon sx={{ fontSize: 24, fill: '#E8EBC8' }} />
      <h3 className="text-[14px] font-medium leading-[22px] text-white">도서 추천 메이트</h3>
      <div>
        <h2 className="text-[16px] font-bold leading-5 text-[#E8EBC8]">당신의 마음을 ZIP는</h2>
        <h2 className="text-[16px] font-bold leading-5 text-white">부키와 대화해보세요</h2>
      </div>
      <img src={Bookie} className="w-[100px]" />
    </div>
  );
};

export default BookieBox;
