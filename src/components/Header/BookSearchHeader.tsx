import { useEffect, useState } from 'react';
import Arrow from '../../../public/icons/menu-bar/ArrowLeft.svg?react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Zip/SearchBar';

interface BookSearchHeaderProps {
  query?: string;
}

const BookSearchHeader = ({ query }: BookSearchHeaderProps) => {
  const [searchWord, setSearchWord] = useState(query || '');
  const nav = useNavigate();

  useEffect(() => {
    if (query !== undefined) {
      setSearchWord(query);
    }
  }, [query]);

  const handleSearch = () => {
    nav(`/booksnap?query=${searchWord}`);
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-20 m-auto flex max-w-[500px] items-center gap-[15px] border-b-[1px] border-[#544F4F] bg-bg px-[20px] py-[10px]">
      <Arrow onClick={() => nav('/booksnap')} />
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onSearch={handleSearch}
        text="책 제목으로 리뷰를 찾아보세요!"
      />
    </div>
  );
};

export default BookSearchHeader;
