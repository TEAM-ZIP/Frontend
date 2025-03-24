import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);

    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
