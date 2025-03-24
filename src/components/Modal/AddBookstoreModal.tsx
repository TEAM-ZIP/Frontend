import { useState } from 'react';
import Button from '../Button/Button';
import LabeledInput from './LabeledInput';

interface ModalProps {
  setModalOpen: (value: boolean) => void;
  name: string;
}

const AddBookstoreModal = ({ setModalOpen, name }: ModalProps) => {
  const [bookstoreName, setBookstoreName] = useState(name);
  const [address, setAddress] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [feature, setFeature] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <div className="flex w-[320px] flex-col items-center justify-center gap-6 rounded-2xl bg-white p-4">
      <div className="flex w-full flex-col">
        <p className="text-[18px] font-semibold">독립서점 제보하기</p>
        <p className="text-[14px] text-gray_2">용가리님만 알고있는 독립서점을 제보해주세요!</p>
      </div>
      <LabeledInput
        label="서점 이름"
        placeholder="정확한 상호명을 남겨주세요"
        value={bookstoreName}
        onChange={(e) => setBookstoreName(e.target.value)}
      />
      <LabeledInput
        label="서점 주소"
        placeholder="정확한 주소를 남겨주세요"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <div className="flex w-full flex-col gap-1">
        <p className="text-[14px] font-medium">운영시간</p>
        <div className="flex gap-2">
          <input
            placeholder="여는 시간"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:outline-2 focus:outline-gray-500"
          ></input>
          <input
            placeholder="닫는 시간"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:outline-2 focus:outline-gray-500"
          ></input>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <p className="text-[14px] font-medium">서점의 특색</p>
        <input
          placeholder="관련 키워드를 입력해주세요. ex) 술이 있는 서점"
          value={feature}
          onChange={(e) => setFeature(e.target.value)}
          className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:outline-2 focus:outline-gray-500"
        ></input>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="서점에 관한 상세정보를 남겨주세요."
          className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:outline-2 focus:outline-gray-500"
        ></textarea>
      </div>
      <div className="flex w-full gap-2">
        <Button text="완료" />
        <Button text="닫기" color="white" onClick={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default AddBookstoreModal;
