import { useEffect, useState } from 'react';
import SearchBar from '../../components/Zip/SearchBar';
import CategoryButton from '../../components/Button/CategoryButton';
import RoundButton from '../../components/Button/RoundButton';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import UserLikeZip from './UserLikeZip';
import { defaultLocation, ILocation, useGeoLocation } from '../../hooks/useGeolocation';
import SearchZip from './SearchZip';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { useMap } from '../../hooks/useMap';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { getCategoryBookstore, getHeartBookstore, searchBookstore } from '../../api/zip.api';
import { getZipPreview } from '../../model/zip.model';
import HomeHeader from '../../components/Header/HomeHeader';

export const BOOKSTORE_OPTIONS = [
  { key: 'INDEP', label: '📚 독립서점' },
  { key: 'CAFE', label: '☕️ 카페가 있는 서점' },
  { key: 'CHILD', label: '🐥 아동서점' },
] as const;

const Zip = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation>(defaultLocation);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchResults, setSearchResults] = useState<getZipPreview[]>([]);
  const { setBottomSheet, closeBottomSheet, isOpen } = useBottomSheetStore();
  const [prevView, setPrevView] = useState(() => useBottomSheetStore.getState().prevView || null);
  const [locations, setLocations] = useState<{ address: string }[]>([]);

  useMap(location?.latitude, location?.longitude, locations);
  const handleCurrentLocation = useCurrentLocation(location);

  useEffect(() => {
    if (isLiked) {
      getHeartBookstore(location!.latitude, location!.longitude).then((data) => {
        setLocations(data.data.bookstores.map((store: getZipPreview) => ({ address: store.address })));
        setBottomSheet(
          ({ currentState }) => <UserLikeZip currentState={currentState} bookstoreList={data.data.bookstores} />,
          '내가 찜한 서점',
        );
      });
    }
    // prevView가 없다면 닫기 (돌아왔을 때만 닫힘)
    else if (!prevView && searchWord === '') {
      closeBottomSheet();
    }
  }, [isLiked, searchWord, prevView]);

  // 좋아요 처리
  const handleHeart = () => {
    setIsLiked((prev) => !prev);
  };

  // 현위치 처리
  const handleLocationClick = () => {
    handleCurrentLocation();
    setIsLiked(false);
    closeBottomSheet();
  };

  // 검색 처리
  const handleSearch = async () => {
    setIsLiked(false);
    // 검색 API 호출
    try {
      searchBookstore(searchWord, location!.latitude, location!.longitude).then((data) => {
        setSearchResults(data.data);
        setLocations(data.data.map((store: getZipPreview) => ({ address: store.address })));

        setBottomSheet(
          ({ currentState }) => <SearchZip searchResults={data.data} currentState={currentState} />,
          '검색 결과',
        );
      });

      // 모바일 환경에서 검색하면 키보드 닫아주기
      const searchInput = document.querySelector('input');
      if (searchInput) searchInput.blur(); // 포커스 해제
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <div
      className="relative h-full w-full"
      style={{
        overflow: isOpen ? 'visible' : 'hidden',
      }}
    >
      <HomeHeader />
      <div className={`pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full flex-col`}>
        {/* 찜버튼 & 현재위치 */}
        <div className="border-3 pointer-events-auto mt-3 flex flex-col items-end gap-3 border-red-400 px-[10px] pt-[52px]">
          <RoundButton type="heart" onClick={handleHeart} isLiked={isLiked} />
          <RoundButton type="current" onClick={handleLocationClick} />
        </div>
      </div>
      <div id="map" className="h-full w-full" />
      <BottomSheet />
    </div>
  );
};

export default Zip;
