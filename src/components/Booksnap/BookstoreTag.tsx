import { useNavigate } from 'react-router-dom';

interface BookstoreProps {
  name: string;
}

const BookstoreTag = ({ name }: BookstoreProps) => {
  const nav = useNavigate();

  const handleSearch = () => {
    nav(`/zip?search=${name}`);
  };

  return (
    <div className="rounded-[10px] border-[1px] border-pink px-3 py-[2px] text-[12px] text-pink" onClick={handleSearch}>
      {name}
    </div>
  );
};

export default BookstoreTag;
