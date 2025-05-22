import { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import SearchBar from '../../components/Zip/SearchBar';
import { getMyBook } from '../../api/mypage.api';
import { BookDetailInfo } from '../../model/booksnap.model';
import BookInfo from '../../components/Booksnap/BookInfo';
import { deleteBook } from '../../api/booksnap.api';
import toast from 'react-hot-toast';
import { MdBookmarkRemove } from 'react-icons/md';

const MyBook = () => {
  const [searchWord, setSearchWord] = useState('');
  const [books, setBooks] = useState<BookDetailInfo[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookDetailInfo[]>([]);

  useEffect(() => {
    getMyBook().then((data) => {
      setBooks(data.pickBooks);
      setFilteredBooks(data.pickBooks);
    });
  }, []);

  const handleSearch = () => {
    const result = books.filter((book) => book.title.toLowerCase().includes(searchWord.toLowerCase()));
    setFilteredBooks(result);
  };

  const handlePickBook = (book: BookDetailInfo) => {
    deleteBook(book.bookId).then((data) => {
      if (data?.success) {
        toast.success(`${book.title}을(를) 책장에서 삭제했습니다!`);

        setBooks((prev) => prev.filter((b) => b.bookId !== book.bookId));
        setFilteredBooks((prev) => prev.filter((b) => b.bookId !== book.bookId));
      } else {
        toast.error(`${data?.message}`);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 px-8 pt-[100px]">
      <Header title="나의 책장" />
      <SearchBar
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        onSearch={() => handleSearch()}
        text="내가 담은 책을 검색해보세요!"
      />
      <div className="grid w-full grid-cols-3 justify-items-center overflow-y-auto">
        {filteredBooks.map((book) => (
          <div key={book.bookId} className="relative w-[100px]">
            <BookInfo bookInfo={book} />
            <button
              className="absolute right-[12px] top-[88px] rounded-full bg-white p-1 shadow-md"
              onClick={() => handlePickBook(book)}
            >
              <MdBookmarkRemove className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
