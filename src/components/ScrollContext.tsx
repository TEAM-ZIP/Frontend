import { createContext, useContext, useRef } from 'react';

export const ScrollContext = createContext<React.RefObject<HTMLDivElement> | null>(null);

export const useScrollRef = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollRef must be used within a ScrollProvider');
  }
  return context;
};
