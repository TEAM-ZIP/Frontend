import { IoMdTime } from 'react-icons/io';
import { IoTrashSharp } from 'react-icons/io5';

interface RecentSearchProps {
  name: string;
  onClick: (book: string) => void;
}

const RecentSearch = ({ name, onClick }: RecentSearchProps) => {
  return (
    <div className="flex cursor-pointer justify-around gap-[10px] p-[10px]" onClick={() => onClick(name)}>
      <IoMdTime className="h-6 w-6 fill-[#A09F9F]" />
      <p className="flex-1 text-[#A09F9F]">{name}</p>
      <IoTrashSharp className="h-5 w-5 fill-[#A09F9F]" />
    </div>
  );
};

export default RecentSearch;
