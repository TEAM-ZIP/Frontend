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
        className="focus:border-pink focus:ring-pink h-[100px] w-full resize-none rounded-[10px] border-[0.5px] border-gray_1 bg-bg_2 px-[15px] py-[10px] text-body4 text-white focus:outline-none focus:ring-[0.5px]"
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
