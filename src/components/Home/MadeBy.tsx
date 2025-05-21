import StarIcon from '@mui/icons-material/Star';

const MadeBy = () => {
  return (
    <div className="py-[20px]">
      <div className="flex items-center gap-[10px] px-[10px]">
        <StarIcon sx={{ fontSize: 40, fill: '#F9D6E7' }} />
        <StarIcon sx={{ fontSize: 40, fill: '#C0E0D8' }} />
        <p className="ml-[10px] text-body1 font-bold text-white">MADE BY</p>
      </div>
      <div className="flex flex-col items-end p-[10px] text-body3 text-white">
        <p>@topograp2</p>
        <p className="text-pink">독립서점 발굴에 도움이 되길!</p>
      </div>
      <div className="flex flex-col items-end p-[10px] text-body3 text-white">
        <p>@yongaricode</p>
        <p className="text-pink">용가리가 코드를 짠다~</p>
      </div>
      <div className="flex flex-col items-end p-[10px] text-body3 text-white">
        <p>@hyuna</p>
        <p className="text-pink">안녕하세요~~</p>
      </div>
    </div>
  );
};

export default MadeBy;
