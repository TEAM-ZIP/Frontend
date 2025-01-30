import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import CategoryButton from '../../components/CategoryButton';
import RoundButton from '../../components/RoundButton';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import UserLikeZip from './UserLikeZip';
import { useGeoLocation } from '../../hooks/useGeolocation';
import SearchZip from './SearchZip';
import { currentMarker } from '../../utils/currentMarker';
import { useBottomSheetStore } from '../../store/bottomSheetStore';

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
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { location, error } = useGeoLocation(geolocationOptions);
  const [currentBookstore, setCurrentBookstore] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { setBottomSheet, closeBottomSheet, isOpen } = useBottomSheetStore();

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
    setIsLiked((prev) => !prev);
    setCurrentBookstore(null);
  };

  const handleCurrentLocation = () => {
    if (location) {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const options = {
          center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, options);
        const position = new window.kakao.maps.LatLng(location.latitude, location.longitude);

        const marker = currentMarker(map, position);
        marker.setMap(map);
      }
      setIsLiked(false);
      closeBottomSheet();
    } else if (error) {
      console.error('Geolocation Error:', error);
      alert('현재 위치를 가져올 수 없습니다. 위치 서비스를 확인해주세요.');
    }
  };

  const handleSearch = async () => {
    // 검색 API 호출
    try {
      setSearchResults(['진시황']);

      // 모바일 환경에서 검색하면 키보드 닫아주기
      const searchInput = document.querySelector('input');
      if (searchInput) searchInput.blur(); // 포커스 해제

      setBottomSheet(
        ({ currentState }) => <SearchZip searchResults={searchResults} currentState={currentState} />,
        '검색 결과',
      );
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (currentBookstore) {
      setSearchResults(['카페가 있는 서점']);
      setBottomSheet(
        ({ currentState }) => <SearchZip searchResults={searchResults} currentState={currentState} />,
        '독립 서점',
      );
    }
  }, [currentBookstore]); // 카테고리 변경 시 바텀시트 유지

  const handleCategorySelect = (category: string) => {
    if (currentBookstore !== category) {
      setIsLiked(false); // UI는 바뀌지만 바텀시트는 닫히지 않음
      setCurrentBookstore(category);
    } else {
      setCurrentBookstore(null);
    }
  };

  useEffect(() => {
    if (isLiked) {
      setBottomSheet(({ currentState }) => <UserLikeZip currentState={currentState} />, '내가 찜한 서점');
    } else if (!currentBookstore) {
      closeBottomSheet();
    }
  }, [isLiked]);

  return (
    <div
      className="w-full h-full relative"
      style={{
        overflow: isOpen ? 'visible' : 'hidden',
      }}
    >
      <div className={`absolute top-0 left-0 w-full h-full flex flex-col z-10 pointer-events-none`}>
        {/* 검색바 */}
        <div className="w-full mt-[18px] px-[10px] pointer-events-auto">
          <SearchBar setSearchWord={setSearchWord} searchWord={searchWord} onSearch={handleSearch} />
        </div>
        {/* 카테고리 버튼 */}
        <div className="relative mt-2 px-[10px] pointer-events-auto overflow-y-visible">
          <div className="flex gap-2 w-max">
            <CategoryButton
              text="📚 독립서점"
              onClick={() => handleCategorySelect('indie')}
              isSelected={currentBookstore === 'indie'}
            />
            <CategoryButton
              text="☕️ 카페가 있는 서점"
              onClick={() => handleCategorySelect('cafe')}
              isSelected={currentBookstore === 'cafe'}
            />
            <CategoryButton
              text="🐥 아동서점"
              onClick={() => handleCategorySelect('children')}
              isSelected={currentBookstore === 'children'}
            />
          </div>
        </div>
        {/* 찜버튼 & 현재위치 */}
        <div className="mt-3 flex flex-col gap-3 items-end px-[10px] pointer-events-auto">
          <RoundButton type="heart" onClick={handleHeart} isLiked={isLiked} />
          <RoundButton type="current" onClick={handleCurrentLocation} />
        </div>
      </div>
      <div id="map" className="w-full h-full" />
      <BottomSheet />
    </div>
  );
};

export default Zip;
