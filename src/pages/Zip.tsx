import { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import RoundButton from '../components/RoundButton';

declare global {
  interface Window {
    kakao: any;
  }
}

const Zip = () => {
  useEffect(() => {
    let container = document.getElementById(`map`);
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col z-10 pointer-events-none">
        {/* 검색바 */}
        <div className="w-full mt-[18px] px-[10px] pointer-events-auto">
          <SearchBar />
        </div>
        {/* 카테고리 버튼 */}
        <div className="relative mt-2 px-[10px] overflow-x-auto scrollbar-hide pointer-events-auto">
          <div className="flex gap-2 w-max">
            <CategoryButton text="📚 독립서점" />
            <CategoryButton text="☕️ 카페가 있는 서점" />
            <CategoryButton text="🐥 아동서점" />
            <CategoryButton text="🏢 대형서점" />
          </div>
        </div>
        {/* 찜버튼 & 현재위치 */}
        <div className="mt-3 flex flex-col gap-3 items-end px-[10px] pointer-events-auto">
          <RoundButton type="heart" />
          <RoundButton type="current" />
        </div>
      </div>
      <div id="map" className="w-full h-full" />
    </div>
  );
};

export default Zip;
