import { Outlet } from 'react-router-dom';
import Header from './Common/Header';
import MenuBar from './Common/MenuBar';
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
    <div className="relative flex flex-col">
      <div className="fixed z-10 w-full max-w-[500px]" ref={headerHeight}>
        <Header />
      </div>
      <main
        className="overflow-y-auto scrollbar-thin scrollbar-none scrollbar-track-transparent"
        style={{
          marginTop: `${heights.header}px`,
          marginBottom: `${heights.menubar}px`,
          height: `calc(100dvh - ${heights.header + heights.menubar}px)`,
        }}
      >
        <Outlet />
      </main>
      <footer className="fixed bottom-0 z-30 w-full max-w-[500px]" ref={menuBarHeight}>
        <MenuBar />
      </footer>
    </div>
  );
};

export default Layout;
