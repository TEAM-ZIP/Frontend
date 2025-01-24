import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import RoundButton from '../components/RoundButton';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import UserLikeZip from './UserLikeZip';
import { useGeoLocation } from '../hooks/useGeolocation';

declare global {
  interface Window {
    kakao: any;
  }
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 30,
  maximumAge: 1000 * 3600 * 24,
};

const Zip = () => {
  const [bottomSheetContent, setBottomSheetContent] = useState<React.ReactNode>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { location, error } = useGeoLocation(geolocationOptions);

  useEffect(() => {
    const defaultLatitude = 33.450701; // 기본 위도
    const defaultLongitude = 126.570667; // 기본 경도

    const initializeMap = (latitude: number, longitude: number) => {
      let container = document.getElementById(`map`);
      if (container) {
        let options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      }
    };

    if (location) {
      initializeMap(location.latitude, location.longitude);
    } else {
      initializeMap(defaultLatitude, defaultLongitude);
    }
  }, [location]);

  const handleHeart = () => {
    // 찜한 목록들 마커로 보여주기 추가 필요
    if (isLiked) {
      setIsLiked(false);
      setIsBottomSheetOpen(false);
      setBottomSheetContent(null);
    } else {
      setIsLiked(true);
      setBottomSheetContent(<UserLikeZip />);
      setIsBottomSheetOpen(true);
    }
  };

  const handleCurrentLocation = () => {
    if (location) {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const options = {
          center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
          level: 2,
        };

        const map = new window.kakao.maps.Map(mapContainer, options);

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        });
        marker.setMap(map);
      }
      setIsLiked(false);
      setIsBottomSheetOpen(false);
      setBottomSheetContent(null);
    } else if (error) {
      console.error('Geolocation Error:', error);
      alert('현재 위치를 가져올 수 없습니다. 위치 서비스를 확인해주세요.');
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
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
            {/* <CategoryButton text="🏢 대형서점" /> */}
          </div>
        </div>
        {/* 찜버튼 & 현재위치 */}
        <div className="mt-3 flex flex-col gap-3 items-end px-[10px] pointer-events-auto">
          <RoundButton type="heart" onClick={handleHeart} isLiked={isLiked} />
          <RoundButton type="current" onClick={handleCurrentLocation} />
        </div>
      </div>
      <div id="map" className="w-full h-full" />
      <BottomSheet view={bottomSheetContent} isOpen={isBottomSheetOpen} />
    </div>
  );
};

export default Zip;
