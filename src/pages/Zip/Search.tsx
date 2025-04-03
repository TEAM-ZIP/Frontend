import { useState } from 'react';
import Name from '../../components/Home/Name';
import SearchBar from '../../components/Zip/SearchBar';
import FilterButton from '../../components/Button/FilterButton';
import Box from '../../components/Zip/Box';
import TagBar from '../../components/Zip/TagBar';
import Ranking from '../../components/Home/Ranking';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchWord, setSearchWord] = useState('');
  const nav = useNavigate();

  const handleSearch = () => {
    nav(`/zip?search=${searchWord}`);
  };

  return (
    <div className="flex h-full flex-col gap-9 overflow-x-hidden bg-bg px-[20px] pb-7 pt-6 scrollbar-none">
      {/* 이름 및 필터바 */}
      <div className="flex flex-col gap-4 px-[10px]">
        <Name text="ZIP 검색하기" />
        <SearchBar
          setSearchWord={setSearchWord}
          searchWord={searchWord}
          onSearch={handleSearch}
          text="독립서점을 찾아보세요 !"
        />
        <div className="flex gap-2">
          <FilterButton text="필터" />
          <FilterButton text="내 주변" />
          <FilterButton text="지역" />
          <FilterButton text="분위기" />
          <FilterButton text="서적" />
        </div>
        <button className="rounded-[20px] bg-green py-2 text-[14px] font-bold tracking-[0.56px]" onClick={handleSearch}>
          검색
        </button>
      </div>
      {/* 독서 테마 추천 */}
      <div className="flex flex-col gap-5">
        <p className="text-[13px] font-semibold text-white">독서의 즐거움을 찾아보세요!</p>
        <Box />
      </div>
      {/* 추천 해시태그 */}
      <div className="flex flex-col gap-4">
        <p className="text-[13px] font-semibold text-white">추천 해시태그</p>
        <TagBar />
      </div>
      {/* 관심 급상승 */}
      <div className="flex flex-col gap-6">
        <p className="text-[13px] font-semibold text-white">관심 급상승 독립서점</p>
        <Ranking />
      </div>
    </div>
  );
};

export default Search;
