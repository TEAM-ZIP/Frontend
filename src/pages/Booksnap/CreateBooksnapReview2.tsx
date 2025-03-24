import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import image from '../../../public/icons/book-snap/image.png';
import Star from '../../components/Zip/Star';
import { useState } from 'react';
import WritingReview from '../../components/Zip/WritingReview';
import Button from '../../components/Button/Button';
import { postBookReview } from '../../api/booksnap.api';
import Step from '../../components/Booksnap/Step';

const CreateBooksnapReview2 = () => {
  const location = useLocation();
  const book = location.state.book || false;
  const nav = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleReviewPost = () => {
    const payload = {
      isbn: book.isbn,
      rating: rating,
      reviewText: review,
    };
    postBookReview(payload).then((data) => {
      console.log('리뷰 등록 성공');
      nav('/booksnap');
    });
  };

  return (
    <div className="flex h-full flex-col bg-bg pb-[50px] pt-[70px]">
      {/* 헤더 */}
      <Header title="리뷰 작성하기" />
      {/* 내용 */}
      <div className="mt-[40px] flex w-full flex-col items-center px-8">
        <Step step={2} text="리뷰 내용을 작성해주세요." />
        {/* 책 정보 */}
        <div className="mb-4 flex flex-col items-center justify-center">
          <img
            src={book.bookImageUrl == '' ? image : book.bookImageUrl}
            className="w-20"
            style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
          />
          <p className="balance mb-1 mt-4 max-w-[13ch] text-wrap text-[15px] font-bold tracking-[-0.56px] text-white">
            {book.title}
          </p>
          <p className="text-[13px] font-light tracking-[-0.48px] text-gray_2">{book.authors.join(', ')}</p>
          <p className="text-[13px] font-light tracking-[-0.48px] text-gray_2">{book.publisher}</p>
        </div>
        {/* 별졈 */}
        <Star rating={rating} setRating={setRating} size={28} />
        {/* 리뷰 쓰기 */}
        <div className="mt-6 w-full">
          <WritingReview onChange={(e) => setReview(e.target.value)} value={review} />
        </div>
        {/* 버튼 */}
        <div className="mt-[10px] w-full">
          <Button text="리뷰 등록" onClick={handleReviewPost} />
        </div>
      </div>
    </div>
  );
};

export default CreateBooksnapReview2;
