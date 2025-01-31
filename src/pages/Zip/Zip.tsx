import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import CategoryButton from '../../components/CategoryButton';
import RoundButton from '../../components/RoundButton';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import UserLikeZip from './UserLikeZip';
import { useGeoLocation } from '../../hooks/useGeolocation';
import SearchZip from './SearchZip';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import { useMap } from '../../hooks/useMap';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';

const BOOKSTORE_OPTIONS = [
  { key: 'indie', label: '📚 독립서점' },
  { key: 'cafe', label: '☕️ 카페가 있는 서점' },
  { key: 'children', label: '🐥 아동서점' },
] as const;

const Zip = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { location, error } = useGeoLocation();
  const [currentBookstore, setCurrentBookstore] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { setBottomSheet, closeBottomSheet, isOpen } = useBottomSheetStore();

  useMap(location?.latitude, location?.longitude);
  const handleCurrentLocation = useCurrentLocation(location, error);

  useEffect(() => {
    if (isLiked) {
      setBottomSheet(({ currentState }) => <UserLikeZip currentState={currentState} />, '내가 찜한 서점');
    } else if (!currentBookstore && searchWord == '') {
      closeBottomSheet();
    }
  }, [isLiked]);

  useEffect(() => {
    if (currentBookstore) {
      setSearchResults(['카페가 있는 서점']);
      setBottomSheet(
        ({ currentState }) => <SearchZip searchResults={searchResults} currentState={currentState} />,
        '독립 서점',
      );
    }
  }, [currentBookstore]);

  const handleHeart = () => {
    setIsLiked((prev) => !prev);
    setCurrentBookstore(null);
  };

  const handleCategorySelect = (category: string) => {
    if (currentBookstore !== category) {
      setIsLiked(false); // UI는 바뀌지만 바텀시트는 닫히지 않음
      setCurrentBookstore(category);
    } else {
      setCurrentBookstore(null);
    }
  };

  const handleLocationClick = () => {
    handleCurrentLocation();
    setIsLiked(false);
    setCurrentBookstore(null);
    closeBottomSheet();
  };

  const handleSearch = async () => {
    setIsLiked(false);
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
            {BOOKSTORE_OPTIONS.map((type) => (
              <CategoryButton
                key={type.key}
                text={type.label}
                onClick={() => handleCategorySelect(`${type.key}`)}
                isSelected={currentBookstore === `${type.key}`}
              />
            ))}
          </div>
        </div>
        {/* 찜버튼 & 현재위치 */}
        <div className="mt-3 flex flex-col gap-3 items-end px-[10px] pointer-events-auto">
          <RoundButton type="heart" onClick={handleHeart} isLiked={isLiked} />
          <RoundButton type="current" onClick={handleLocationClick} />
        </div>
      </div>
      <div id="map" className="w-full h-full" />
      <BottomSheet />
    </div>
  );
};

export default Zip;
