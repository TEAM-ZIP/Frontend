import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '../../public/icons/menu-bar/HomeRounded.svg?react';
import ZipIcon from '../../public/icons/menu-bar/MapRounded.svg?react';
import BookieIcon from '../../public/icons/menu-bar/RateReviewRounded.svg?react';
import BooksnapIcon from '../../public/icons/menu-bar/CommentRounded.svg?react';
import MyPageIcon from '../../public/icons/menu-bar/Person_2Rounded.svg?react';
import Indicator from '../../public/icons/menu-bar/Indicator.svg?react';

const MenuBar = () => {
	const nav = useNavigate();
	const [currentMenu, setCurrentMenu] = useState<string>('home');

	const menus = [
		{
			menu: 'Home',
			name: '',
			inactive: <HomeIcon className="h-7 w-7" />,
			active: <HomeIcon />,
		},
		{
			menu: '서점ZIP가기',
			name: 'zip',
			inactive: <ZipIcon className="h-7 w-7" />,
			active: <ZipIcon className="h-7 w-7" />,
		},
		{
			menu: 'Booksnap',
			name: 'booksnap',
			inactive: <BooksnapIcon className="h-7 w-7" />,
			active: <BooksnapIcon className="h-7 w-7" />,
		},
		{
			menu: 'Bookie',
			name: 'bookie',
			inactive: <BookieIcon className="h-7 w-7" />,
			active: <BookieIcon className="h-7 w-7" />,
		},
		{
			menu: 'My Page',
			name: 'mypage',
			inactive: <MyPageIcon className="h-7 w-7" />,
			active: <MyPageIcon className="h-7 w-7" />,
		},
	];
	return (
		<div className="flex border-t border-gray-200">
			<div className="grid w-full grid-cols-5">
				{menus.map((menuItem) => (
					<div
						key={menuItem.name}
						className={`flex cursor-pointer flex-col items-center px-2 ${currentMenu === menuItem.name ? 'pb-[0px] pt-[6px]' : 'py-[6px]'}`}
						onClick={() => {
							setCurrentMenu(menuItem.name);
							nav(menuItem.name);
						}}
					>
						<div
							className={`flex flex-col items-center gap-1 ${currentMenu === menuItem.name ? 'pb-[0px] pt-[4px]' : 'pb-[2px] pt-[9px]'}`}
						>
							{currentMenu === menuItem.name
								? menuItem.active
								: menuItem.inactive}
							<p
								className={`text-center ${currentMenu === menuItem.name ? 'text-main_1 text-[12px] font-semibold' : 'text-[12px] text-gray-500'}`}
							>
								{menuItem.menu}
							</p>
							{currentMenu === menuItem.name ? (
								<Indicator className="h-[6px]" />
							) : (
								''
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MenuBar;
