import { Outlet } from 'react-router-dom';
import MenuBar from './Common/MenuBar';
import { useEffect, useRef, useState } from 'react';
import { ScrollContext } from './ScrollContext';

const Layout = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const menuBarHeight = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (menuBarHeight.current) {
        requestAnimationFrame(() => {
          const menubar = menuBarHeight.current?.offsetHeight || 0;
          setHeights(menubar);
        });
      }
    };

    updateHeights();

    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  return (
    <ScrollContext.Provider value={mainRef}>
      <div className="relative flex flex-col">
        <main
          className="overflow-y-auto scrollbar-none"
          ref={mainRef}
          style={{
            marginBottom: `${heights}px`,
            height: `calc(100dvh - ${heights}px)`,
          }}
        >
          <Outlet />
        </main>
        <footer className="fixed bottom-0 z-30 w-full max-w-[500px]" ref={menuBarHeight}>
          <MenuBar />
        </footer>
      </div>
    </ScrollContext.Provider>
  );
};

export default Layout;
