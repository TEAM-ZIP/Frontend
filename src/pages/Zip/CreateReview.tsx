import WritingReview from '../../components/Zip/WritingReview';
import Button from '../../components/Button/Button';
import Star from '../../components/Zip/Star';
import { ChangeEvent, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const CreateReview = () => {
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState<File[]>([]);
  const [previewList, setPreviewList] = useState<string[]>([]);
  const [review, setReview] = useState<string>('');
  const nav = useNavigate();

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
    console.log('별점', rating);
    console.log('사진', imageList);
    console.log('리뷰:', review);
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
        <p className="border-b-[1px] border-white pb-6 text-body1 font-bold text-green">하늘밭봄</p>

        <div className="mt-[18px] flex w-full flex-col items-center gap-[30px]">
          {/* 사진 추가 및 미리보기 */}
          {/* 사진 추가 및 미리보기 */}
          {previewList.length === 0 ? (
            // 사진이 하나도 없을 때 → 가운데 정렬
            <div className="flex justify-center">
              <label className="border-yellow flex h-[125px] w-[125px] items-center justify-center rounded-[20px] border-[1px]">
                <AddPhotoAlternateIcon sx={{ fontSize: 25, fill: '#FEF3B1' }} />
                <input type="file" accept="image/*" className="hidden" multiple onChange={handleFileChange} />
              </label>
            </div>
          ) : (
            // 사진이 추가되었을 때 → 가로 스크롤 가능한 리스트
            <div className="flex w-full gap-[10px] overflow-x-auto whitespace-nowrap scrollbar-hide">
              <label className="border-yellow flex h-[125px] w-[125px] min-w-[125px] shrink-0 items-center justify-center rounded-[20px] border-[1px]">
                <AddPhotoAlternateIcon sx={{ fontSize: 25, fill: '#FEF3B1' }} />
                <input type="file" accept="image/*" className="hidden" multiple onChange={handleFileChange} />
              </label>
              {previewList.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="h-[125px] w-[125px] min-w-[125px] shrink-0 rounded-[20px] object-cover"
                />
              ))}
            </div>
          )}
          <p className="mt-[10px] text-[14px] text-white">대표 사진을 등록해주세요.</p>

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
