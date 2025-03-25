import RegionBox from './RegionBox';

const Region = () => {
  const regions = ['서울', '경기', '인천', '강원', '제주', '전라', '충청', '경상'];
  return (
    <div className="flex flex-col gap-[15px] bg-bg_2 px-[15px] pb-[10px] pt-[20px]">
      <h3 className="text-[20px] font-bold leading-6 text-white">
        어느 지역에 위치한 <br />
        독립 서점을 찾으시나요?
      </h3>
      <div className="grid grid-cols-3 gap-[10px] py-[10px]">
        <RegionBox text="내 위치" />
        {regions.map((region) => (
          <RegionBox key={region} text={region} />
        ))}
      </div>
    </div>
  );
};

export default Region;
