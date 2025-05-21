import { useNavigate } from 'react-router-dom';
import Marker from '../../../public/icons/zip/markerHome.svg?react';

const PopularBox = () => {
  const nav = useNavigate();
  return (
    <div
      className="flex w-full flex-col justify-center gap-[10px] rounded-[20px] bg-orange px-[10px] pt-[15px]"
      onClick={() => nav('/zip?search=우주소년')}
    >
      <Marker />
      <h3 className="text-[14px] font-medium leading-[22px] text-white">ZIPZIP이들이 PICK한</h3>
      <div className="w-[75%] border-y-[2px] border-solid py-[10px] text-[16px] font-bold leading-5 text-white">
        이달의 인기 서점 <br />
        "우주소년"
      </div>
    </div>
  );
};

export default PopularBox;
