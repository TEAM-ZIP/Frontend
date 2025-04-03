import { useState } from 'react';
import SearchBookstoreModal from '../Modal/SearchBookstoreModal';
import Modal from '../Modal/Modal';

export type Option = {
  bookstoreId: number;
  bookStoreName: string;
  label: string;
  value: string;
};

interface AddBookstoreProps {
  selectedBookstores: readonly Option[];
  setSelectedBookstores: React.Dispatch<React.SetStateAction<readonly Option[]>>;
}

const AddBookstore = ({ selectedBookstores, setSelectedBookstores }: AddBookstoreProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mt-4 flex w-full flex-col gap-2 text-[12px]" onClick={() => setModalOpen(true)}>
      <p className="text-[13px] text-white">발견한 서점</p>
      <div className="flex flex-wrap gap-2">
        <div className="flex h-6 items-center justify-center rounded-full bg-mint px-2 font-medium">+</div>
        {selectedBookstores.map((bookstore, index) => (
          <div
            key={index}
            className="flex h-6 items-center justify-center gap-2 rounded-full bg-pink px-3 text-[12px] font-medium text-[#302D2D]"
          >
            <p>{bookstore.bookStoreName}</p>
            <button
              className="font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBookstores((prev) => prev.filter((b) => b.bookstoreId !== bookstore.bookstoreId));
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {modalOpen && (
        <Modal>
          <SearchBookstoreModal
            setModalOpen={setModalOpen}
            selected={selectedBookstores}
            setSelected={setSelectedBookstores}
          />
        </Modal>
      )}
    </div>
  );
};

export default AddBookstore;
