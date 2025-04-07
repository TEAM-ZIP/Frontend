import { useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import Star from '../../components/Zip/Star';
import { ChangeEvent, useState } from 'react';
import WritingReview from '../../components/Zip/WritingReview';
import Button from '../../components/Button/Button';
import Step from '../../components/Booksnap/Step';
import AddBookstore from '../../components/Booksnap/AddBookstore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { postIndepBook } from '../../api/booksnap.api';
import cropImage from '../../utils/cropImage';

export type Option = {
  bookstoreId: number;
  bookStoreName: string;
  label: string;
  value: string;
};

const CreateBook = () => {
  const nav = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewList, setPreviewList] = useState<string[]>([]); // 미리보기용 URL 저장

  const [selectedBookstores, setSelectedBookstores] = useState<readonly Option[]>([]);

  const handleReviewPost = async () => {
    const bookstoreIds = selectedBookstores.map((b) => b.bookstoreId);

    const payload = {
      bookstoreIds: bookstoreIds,
      title: title,
      authorsString: author,
      rating: rating,
      reviewText: review,
    };

    let imageToUpload = imageList[0];

    if (imageList[0]) {
      const url = URL.createObjectURL(imageList[0]);
      imageToUpload = await cropImage(url, 80, 120); // 자른 File 반환
    }
    postIndepBook(imageToUpload, payload).then(() => {
      nav('/booksnap');
    });
  };

  // 파일 선택 시 실행될 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageList([file]);
      setPreviewList([URL.createObjectURL(file)]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-bg pb-[50px] pt-[70px]">
      {/* 헤더 */}
      <Header title="책 등록 및 리뷰 작성하기" />
      {/* 내용 */}
      <div className="mt-[40px] flex w-full flex-col items-center px-8">
        <Step step={2} text="책에 대한 정보와 리뷰 내용을 작성해주세요." />
        {/* 책 정보 */}
        <div className="mb-2 flex flex-col items-center justify-center">
          <label>
            {previewList.length == 0 ? (
              <div className="flex h-[120px] w-20 items-center justify-center bg-mint">
                <AddCircleOutlineIcon sx={{ fontSize: 40, fill: '#9AB1AC ' }} />
              </div>
            ) : (
              <img src={previewList[0]} alt="썸네일" className="h-[120px] w-20 object-cover" />
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <input
            placeholder="책 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="m-0 mb-1 mt-4 text-wrap border-none bg-transparent p-0 text-center text-[15px] font-bold tracking-[-0.56px] text-white shadow-none outline-none focus:outline-none"
          />
          <input
            placeholder="작가 이름을 입력하세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="text-wrap border-none bg-transparent p-0 text-center text-[13px] font-light tracking-[-0.48px] text-gray_2 shadow-none outline-none focus:outline-none"
          />
        </div>
        {/* 별졈 */}
        <Star rating={rating} setRating={setRating} size={28} />
        {/* 발견한 서점 */}
        <AddBookstore selectedBookstores={selectedBookstores} setSelectedBookstores={setSelectedBookstores} />
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

export default CreateBook;
