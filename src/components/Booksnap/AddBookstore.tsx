import { useState } from 'react';
import SearchBookstoreModal from '../Modal/SearchBookstoreModal';
import Modal from '../Modal/Modal';

export type Option = {
  label: string;
  value: string;
};

const AddBookstore = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookstores, setSelectedBookstores] = useState<readonly Option[]>([]);

  return (
    <div className="mt-4 flex w-full flex-col gap-2 text-[12px]" onClick={() => setModalOpen(true)}>
      <p className="text-[13px] text-white">발견한 서점</p>
      <div className="flex flex-wrap gap-2">
        <div className="bg-mint flex h-6 items-center justify-center rounded-full px-2 font-medium">+</div>
        {selectedBookstores.map((bookstore, index) => (
          <div
            key={index}
            className="bg-pink flex h-6 items-center justify-center gap-2 rounded-full px-3 text-[12px] font-medium text-[#302D2D]"
          >
            <p>{bookstore.label}</p>
            <button
              className="font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBookstores((prev) => prev.filter((b) => b.value !== bookstore.value));
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
