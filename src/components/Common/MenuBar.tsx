import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from '../../../public/icons/menu-bar/HomeRounded.svg?react';
import BooksnapIconActive from '../../../public/icons/menu-bar/CommentRounded.svg?react';
import BooksnapIcon from '../../../public/icons/menu-bar/Booksnap.svg?react';
import Search from '../../../public/icons/menu-bar/search.svg?react';
import SearchActive from '../../../public/icons/menu-bar/searchActive.svg?react';

const MenuBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState<string>('home');

  useEffect(() => {
    const pathnameWithoutSlash = location.pathname.split('/');
    setCurrentMenu(pathnameWithoutSlash[1]);
  }, [location]);

  const menus = [
    {
      menu: 'Search',
      name: 'search',
      inactive: <Search className="h-7 w-7" />,
      active: <SearchActive className="h-7 w-7" />,
    },
    {
      menu: 'Booksnap',
      name: 'booksnap',
      inactive: <BooksnapIcon className="h-7 w-7" />,
      active: <BooksnapIconActive className="h-7 w-7" />,
    },
  ];

  return (
    <div className="relative flex bg-black px-6">
      <div className="flex w-full justify-between">
        {menus.map((menuItem) => (
          <div
            key={menuItem.name}
            className={`flex cursor-pointer flex-col items-center px-2 ${currentMenu === menuItem.name ? 'pb-[0px] pt-[6px]' : 'py-[6px]'}`}
            onClick={() => {
              nav(menuItem.name);
            }}
          >
            <div className={`flex flex-col items-center gap-1 pb-[2px] pt-[9px]`}>
              {currentMenu === menuItem.name ? menuItem.active : menuItem.inactive}
              <p
                className={`text-center ${currentMenu === menuItem.name ? 'text-orange text-[12px] font-semibold' : 'text-blue text-[12px]'}`}
              >
                {menuItem.menu}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute -top-8 left-1/2 flex h-20 w-20 -translate-x-1/2 transform rounded-full bg-black p-2"
        onClick={() => nav('/')}
      >
        <div className={`flex h-full w-full rounded-full p-4 ${currentMenu === '' ? 'bg-orange' : 'bg-blue'}`}>
          <HomeIcon />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
