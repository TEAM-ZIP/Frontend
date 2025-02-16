import { BookDetailInfo } from '../../model/booksnap.model';
import image from '../../../public/icons/book-snap/image.png';
interface BookInfoProps {
  bookInfo: BookDetailInfo;
}

const BookInfo = ({ bookInfo }: BookInfoProps) => {
  const author = bookInfo.authors.join(', ');
  return (
    <div className="flex flex-col gap-5">
      <img
        src={bookInfo.bookImageUrl == '' ? image : bookInfo.bookImageUrl}
        className="w-20"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      />
      <div className="flex flex-col gap-[10px]">
        <p className="text-[15px] font-bold tracking-[-0.56px] text-gray_2">
          {bookInfo.title.length > 14 ? bookInfo.title.substring(0, 14) + '⋯' : bookInfo.title}
        </p>
        <div>
          <p className="text-[13px] font-light tracking-[-0.48px] text-gray_2">
            {author.length > 7 ? author.substring(0, 7) + '⋯' : author}
          </p>
          <p className="text-[13px] font-light tracking-[-0.48px] text-gray_2">
            {bookInfo.publisher.length > 7 ? bookInfo.publisher.substring(0, 7) + '⋯' : bookInfo.publisher}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
