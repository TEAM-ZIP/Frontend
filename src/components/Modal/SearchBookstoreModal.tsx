import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Button from '../Button/Button';
import Modal from './Modal';
import AddBookstoreModal from './AddBookstoreModal';
import { Option } from '../Booksnap/AddBookstore';

interface ModalProps {
  setModalOpen: (value: boolean) => void;
  selected: readonly Option[];
  setSelected: React.Dispatch<React.SetStateAction<readonly Option[]>>;
}

const SearchBookstoreModal = ({ setModalOpen, selected, setSelected }: ModalProps) => {
  const bookstoreOptions = [
    { label: '스토리지북앤필름', value: '스토리지북앤필름' },
    { label: '유어마인드', value: '유어마인드' },
    { label: '퇴근길책한잔', value: '퇴근길책한잔' },
  ];

  const [addBookstoreModalOpen, setAddBookstoreModalOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<readonly Option[]>(selected);
  const [name, setName] = useState('');

  const handleCreate = (inputValue: string) => {
    const newOption = { label: inputValue, value: inputValue };
    setLocalSelected((prev) => [...prev, newOption]);
    setName(inputValue);
    setAddBookstoreModalOpen(true);
  };

  return (
    <div className="flex w-[320px] flex-col items-center justify-center gap-8 rounded-2xl bg-white p-4">
      <div className="flex w-full flex-col">
        <p className="text-[18px] font-semibold">서점 검색</p>
        <p className="text-[14px] text-gray_2">해당 책을 찾은 서점을 검색하거나 등록해주세요!</p>
      </div>
      <CreatableSelect
        isMulti
        isClearable
        value={localSelected}
        options={bookstoreOptions}
        onChange={(val) => setLocalSelected(val)}
        placeholder="서점을 선택하거나 직접 추가하세요"
        className="w-full text-[13px]"
        styles={customStyles}
        onCreateOption={handleCreate}
        formatCreateLabel={(inputValue) => `"${inputValue}" 서점 새로 등록하기`}
      />
      <div className="flex w-full gap-2">
        <Button
          text="완료"
          onClick={() => {
            setSelected(localSelected);
            setModalOpen(false);
          }}
        />
        <Button text="닫기" color="white" onClick={() => setModalOpen(false)} />
      </div>
      {addBookstoreModalOpen && (
        <Modal>
          <AddBookstoreModal setModalOpen={setAddBookstoreModalOpen} name={name} />
        </Modal>
      )}
    </div>
  );
};

export default SearchBookstoreModal;

const customStyles = {
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: '#F9D6E7',
  }),
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: '#302D2D',
  }),
};
