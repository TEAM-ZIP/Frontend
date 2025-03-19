import { IoMdTime } from 'react-icons/io';
import { IoTrashSharp } from 'react-icons/io5';

interface RecentSearchProps {
  name: string;
}

const RecentSearch = ({ name }: RecentSearchProps) => {
  return (
    <div className="flex justify-around gap-[10px] p-[10px]">
      <IoMdTime className="h-6 w-6 fill-[#A09F9F]" />
      <p className="flex-1 text-[#A09F9F]">{name}</p>
      <IoTrashSharp className="h-5 w-5 fill-[#A09F9F]" />
    </div>
  );
};

export default RecentSearch;
