import WritingReview from '../../components/Zip/WritingReview';
import Button from '../../components/Button/Button';
import Star from '../../components/Zip/Star';
import { ChangeEvent, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { postBookstoreReview } from '../../api/zip.api';

const CreateReview = () => {
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [review, setReview] = useState<string>('');
  const nav = useNavigate();

  const location = useLocation();
  const { id, name } = location.state || {};

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageList([...imageList, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewList((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleReviewPost = () => {
    const payload = {
      bookstoreId: id,
      rating: rating,
      text: review,
    };
    postBookstoreReview(imageList[0], payload).then(() => {
      nav(-1);
    });
  };

  return (
    <div className="flex w-full flex-col items-center pt-[68px] text-base tracking-normal">
      {/* 헤더 */}
      <div className="fixed left-0 right-0 top-0 m-auto w-full max-w-[500px]">
        <div className="flex items-center bg-bg px-2 py-3">
          <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={() => nav(-1)}>
            <FaAngleLeft size={24} className="fill-white" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-2 text-center text-[20px] font-medium tracking-[-0.8px]">
            <h3 className="text-orange">리뷰</h3>
            <h3 className="text-white">작성하기</h3>
          </div>
          <div className="w-11" />
        </div>
      </div>

      {/* 본문 */}
      <div className="flex w-full max-w-[500px] flex-col items-center gap-10 px-[32px] pt-[30px]">
        <p className="border-b-[1px] border-white pb-6 text-body1 font-bold text-green">{name}</p>

        <div className="mt-[18px] flex w-full flex-col items-center gap-[30px]">
          {/* 사진 추가 및 미리보기 */}
          <div className="flex flex-col gap-3">
            <label>
              {previewList.length === 0 ? (
                <div className="flex h-[125px] w-[125px] items-center justify-center rounded-[20px] border-[1px] border-yellow">
                  <AddPhotoAlternateIcon sx={{ fontSize: 25, fill: '#FEF3B1' }} />
                </div>
              ) : (
                <img src={previewList[0]} alt="썸네일" className="h-[125px] w-[125px] rounded-[20px] object-cover" />
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
            <p className="mt-[10px] text-[14px] text-white">대표 사진을 등록해주세요.</p>
          </div>

          {/* 별점 */}
          <Star setRating={setRating} rating={rating} size={25} color="text-orange" />

          {/* 리뷰 작성 */}
          <div className="w-full">
            <WritingReview onChange={(e) => setReview(e.target.value)} value={review} />
          </div>
        </div>

        <div className="w-full">
          <Button text="리뷰 등록" onClick={handleReviewPost} color="green" />
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
