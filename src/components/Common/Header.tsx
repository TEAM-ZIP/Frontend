import { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="bg-bg fixed z-30 flex w-full items-center justify-around gap-[65px] border-b-[1px] border-[#544F4F] p-[10px]">
      {children}
    </div>
  );
};

export default Header;
