import { Outlet } from 'react-router-dom';
import Header from './Header';
import MenuBar from './MenuBar';
import { useEffect, useRef, useState } from 'react';

// 로그인 이후 사용 가능한 페이지 -> 헤더와 해당 페이지가 렌더링 되는 것으로 레이아웃이 동일함
const Layout = () => {
  const headerHeight = useRef<HTMLDivElement>(null);
  const menuBarHeight = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ header: 0, menubar: 0 });

  useEffect(() => {
    const updateHeights = () => {
      if (headerHeight.current && menuBarHeight.current) {
        const header = headerHeight.current.offsetHeight;
        const menubar = menuBarHeight.current.offsetHeight;
        setHeights({ header, menubar });
      }
    };

    updateHeights();

    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed w-full max-w-[500px]" ref={headerHeight}>
        <Header />
      </div>
      <main
        className="flex-grow overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300"
        style={{
          marginTop: `${heights.header}px`,
          marginBottom: `${heights.menubar}px`,
          height: `calc(100vh - ${heights.header + heights.menubar}px)`,
        }}
      >
        <Outlet />
      </main>
      <footer className="fixed bottom-0 w-full max-w-[500px]" ref={menuBarHeight}>
        <MenuBar />
      </footer>
    </div>
  );
};

export default Layout;
