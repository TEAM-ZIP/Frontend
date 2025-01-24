import { Outlet } from 'react-router-dom';
import Header from './Header';
import MenuBar from './MenuBar';
import { useEffect, useRef, useState } from 'react';

const Layout = () => {
  const headerHeight = useRef<HTMLDivElement>(null);
  const menuBarHeight = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ header: 0, menubar: 0 });

  useEffect(() => {
    const updateHeights = () => {
      if (headerHeight.current && menuBarHeight.current) {
        requestAnimationFrame(() => {
          const header = headerHeight.current?.offsetHeight || 0;
          const menubar = menuBarHeight.current?.offsetHeight || 0;
          setHeights({ header, menubar });
        });
      }
    };

    updateHeights();

    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="fixed w-full max-w-[500px] z-30" ref={headerHeight}>
        <Header />
      </div>
      <main
        className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300"
        style={{
          marginTop: `${heights.header}px`,
          marginBottom: `${heights.menubar}px`,
          height: `calc(100dvh - ${heights.header + heights.menubar}px)`,
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
