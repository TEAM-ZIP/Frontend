import { useNavigate } from 'react-router-dom';
import Logo from '../../../public/icons/menu-bar/logo.svg?react';
import { IoSearch } from 'react-icons/io5';

const BooksnapHeader = () => {
  const nav = useNavigate();
  return (
    <div className="bg-bg fixed z-30 flex w-full items-center justify-around gap-[65px] border-b-[1px] border-[#544F4F] p-[10px]">
      <Logo className="h-[30px] w-6" />
      <div className="text-body1 font-bold">
        <span className="text-[#F9D6E7]">BOOK</span>
        <span className="text-[#C0E0D8]">SNAP</span>
      </div>
      <IoSearch className="h-6 w-6 fill-[#C6B8B8]" onClick={() => nav('search')} />
    </div>
  );
};

export default BooksnapHeader;
