import { useState } from 'react';

interface WritingReviewProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const WritingReview = ({ onChange, value }: WritingReviewProps) => {
  const [length, setLength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.target.value.length);
    onChange(e); // 부모에서 전달받은 onChange 실행
  };

  return (
    <div>
      <textarea
        className="h-[100px] w-full resize-none rounded-[10px] border-[0.5px] border-gray_1 px-[15px] py-[10px] text-body4 focus:border-main_1 focus:outline-none focus:ring-[0.5px] focus:ring-main_1"
        placeholder="리뷰를 작성해주세요"
        maxLength={200}
        onChange={handleChange}
        value={value}
      />
      <p className="flex justify-end text-[13px] text-gray_1">{length}/200</p>
    </div>
  );
};

export default WritingReview;
