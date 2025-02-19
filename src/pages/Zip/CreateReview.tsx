import Header from '../../components/Common/Header';
import ZipInfo from '../../components/Zip/ZipInfo';
import addImage from '../../../public/icons/zip/addImage.png';
import WritingReview from '../../components/Zip/WritingReview';
import Button from '../../components/Button/Button';
import Star from '../../components/Zip/Star';
import { ChangeEvent, useState } from 'react';

const CreateReview = () => {
  const [rating, setRating] = useState(0);
  const [imageList, setImageList] = useState<File[]>([]); //
  //  이미지 목록
  const [previewList, setPreviewList] = useState<string[]>([]); // 미리보기용 URL 저장
  const [review, setReview] = useState<string>('');

  // 파일 선택 시 실행될 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageList([...imageList, ...newFiles]);

      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewList((prev) => [...prev, ...newPreviews]);
    }
  };

  // 리뷰 등록 함수
  const handleReviewPost = () => {
    // 리뷰 등록 API
    console.log('별점', rating);
    console.log('사진', imageList);
    console.log('리뷰:', review);
  };

  return (
    <div className="flex flex-col text-base tracking-normal">
      <Header title="리뷰 쓰기" />
      <div className="flex flex-col px-[32px] pt-[32px]">
        <div>
          {/* 서점 정보 */}
          <ZipInfo />
        </div>
        <div className="mt-[18px] flex flex-col gap-[18px]">
          {/* 별점 */}
          <Star setRating={setRating} rating={rating} size={18} />
          {/* 사진 추가 */}
          <div className="relative flex h-[80px] gap-[14px]">
            {/* 사진 추가 버튼 */}
            <label className="flex-shrink-0">
              <img src={addImage} className="h-[80px] w-[80px] cursor-pointer" />
              <input type="file" accept="image/*" className="hidden" multiple onChange={handleFileChange} />
            </label>
            {/* 가로 스크롤 가능한 영역 (추가된 이미지들만) */}
            <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <div className="flex gap-[10px]">
                {previewList.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    className="h-[80px] w-[80px] rounded-[10px] object-cover"
                    style={{ minWidth: '80px', minHeight: '80px', maxWidth: '80px', maxHeight: '80px' }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* 리뷰 작성 */}
          <div>
            <WritingReview onChange={(e) => setReview(e.target.value)} value={review} />
          </div>
        </div>
        <div className="mt-[5px]">
          <Button text="리뷰 등록" onClick={handleReviewPost} />
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
