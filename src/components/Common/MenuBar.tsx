import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from '../../../public/icons/menu-bar/HomeRounded.svg?react';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Person2Icon from '@mui/icons-material/Person2';
import toast from 'react-hot-toast';

const MenuBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState<string>('home');
  const isLogin = localStorage.getItem('accessToken');

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.startsWith('/zip') || pathname.startsWith('/search')) {
      setCurrentMenu('search');
    } else {
      const pathnameWithoutSlash = pathname.split('/')[1];
      setCurrentMenu(pathnameWithoutSlash);
    }
  }, [location]);

  const menus = [
    {
      menu: 'Search',
      name: 'search',
      inactive: <SearchIcon sx={{ fontSize: 30, fill: '#9DB2CE' }} />,
      active: <SearchIcon sx={{ fontSize: 30, fill: '#E27451' }} />,
    },
    {
      menu: 'Booksnap',
      name: 'booksnap',
      inactive: <RateReviewIcon sx={{ fontSize: 30, fill: '#9DB2CE' }} />,
      active: <RateReviewIcon sx={{ fontSize: 30, fill: '#E27451' }} />,
    },
    {
      menu: 'Booki',
      name: 'Bookie',
    },
    {
      menu: 'Bookie',
      name: 'bookie',
      inactive: <SmartToyIcon sx={{ fontSize: 30, fill: '#9DB2CE' }} />,
      active: <SmartToyIcon sx={{ fontSize: 30, fill: '#E27451' }} />,
    },
    {
      menu: isLogin ? 'My Page' : 'Login',
      name: isLogin ? 'mypage' : 'login',
      inactive: <Person2Icon sx={{ fontSize: 30, fill: '#9DB2CE' }} />,
      active: <Person2Icon sx={{ fontSize: 30, fill: '#E27451' }} />,
    },
  ];

  return (
    <div className="relative flex bg-black px-3">
      <div className="flex w-full justify-between">
        {menus.map((menuItem) => (
          <div
            key={menuItem.name}
            className={`flex cursor-pointer flex-col items-center px-2 ${currentMenu === menuItem.name ? 'pb-[0px] pt-[6px]' : 'py-[6px]'}`}
            onClick={() => {
              const isAuthenticated = !!localStorage.getItem('accessToken');

              const protectedMenus = ['bookie'];

              if (protectedMenus.includes(menuItem.name) && !isAuthenticated) {
                toast.error('로그인이 필요한 서비스입니다!');
                return;
              }
              nav(menuItem.name);
            }}
          >
            <div className={`flex flex-col items-center gap-1 pb-[2px] pt-[9px]`}>
              {currentMenu === menuItem.name ? menuItem.active : menuItem.inactive}
              <p
                className={`text-center ${currentMenu === menuItem.name ? 'text-[12px] font-semibold text-orange' : 'text-[12px] text-blue'}`}
              >
                {menuItem.menu}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute -top-4 left-1/2 flex h-[70px] w-[70px] -translate-x-1/2 transform rounded-full bg-black p-2"
        onClick={() => nav('/')}
      >
        <div className={`flex h-full w-full rounded-full p-3 ${currentMenu === '' ? 'bg-orange' : 'bg-blue'}`}>
          <HomeIcon />
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
