import { useEffect, useState } from 'react';
import RoundButton from '../../components/Button/RoundButton';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import UserLikeZip from './UserLikeZip';
import { defaultLocation, ILocation } from '../../hooks/useGeolocation';
import SearchZip from './SearchZip';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { useMap } from '../../hooks/useMap';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { getHeartBookstore, searchBookstore } from '../../api/zip.api';
import { getZipPreview } from '../../model/zip.model';
import HomeHeader from '../../components/Header/HomeHeader';
import { useLocation } from 'react-router-dom';

export const BOOKSTORE_OPTIONS = [
  { key: 'INDEP', label: '📚 독립서점' },
  { key: 'CAFE', label: '☕️ 카페가 있는 서점' },
  { key: 'CHILD', label: '🐥 아동서점' },
] as const;

const Zip = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [location, setLocation] = useState<ILocation>(defaultLocation);
  const [searchResults, setSearchResults] = useState<getZipPreview[]>([]);
  const { setBottomSheet, closeBottomSheet, isOpen, resultCount } = useBottomSheetStore();
  const [prevView, setPrevView] = useState(() => useBottomSheetStore.getState().prevView || null);
  const [locations, setLocations] = useState<{ address: string }[]>([]);

  const locationState = useLocation();
  const initialSearchWord = locationState.state?.searchWord || '';
  const [searchWord, setSearchWord] = useState<string>(initialSearchWord);

  useMap(location?.latitude, location?.longitude, locations);
  const handleCurrentLocation = useCurrentLocation(location);

  useEffect(() => {
    if (isLiked) {
      setSearchWord('');
      getHeartBookstore(location!.latitude, location!.longitude).then((data) => {
        setLocations(data.data.bookstores.map((store: getZipPreview) => ({ address: store.address })));
        setBottomSheet(
          ({ currentState }) => <UserLikeZip currentState={currentState} bookstoreList={data.data.bookstores} />,
          '내가 찜한 서점',
          data.data.bookstores.length,
        );
      });
    }
    // prevView가 없다면 닫기 (돌아왔을 때만 닫힘)
    else if (!prevView && searchWord === '') {
      closeBottomSheet();
    }
  }, [isLiked, prevView]);

  useEffect(() => {
    if (initialSearchWord) {
      handleSearch(); // 최초 진입 시 검색어가 있으면 자동 검색 실행
    }
  }, [initialSearchWord]);

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
      const data = await searchBookstore(searchWord, location!.latitude, location!.longitude);

      // 정상 처리
      setSearchResults(data);
      setLocations(data.data.slice(0, 10).map((store: any) => ({ address: store.address })));
      setBottomSheet(
        ({ currentState }) => <SearchZip searchResults={data.data} currentState={currentState} />,
        'ZIP 검색 결과',
        data.data.length,
      );
    } catch (error: any) {
      if (error.response?.status === 404) {
        // 검색 결과 없음
        setSearchResults([]);
        setLocations([]);
        setBottomSheet(({ currentState }) => <SearchZip searchResults={[]} currentState={currentState} />, '검색 결과');
      } else {
        console.error('검색 중 에러:', error);
      }
    }
  };

  return (
    <div
      className="relative h-full w-full"
      style={{
        overflow: isOpen ? 'visible' : 'hidden',
      }}
    >
      <HomeHeader onSearch={handleSearch} searchWord={searchWord} setSearchWord={setSearchWord} />
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
