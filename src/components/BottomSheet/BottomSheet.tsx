import React, { useEffect } from 'react';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import { MAX_Y, MID_Y, MIN_Y } from '../../constants/BottomSheetOption';
interface BottomSheet {
  view: React.ReactNode;
  isOpen: boolean;
}

function BottomSheet({ view, isOpen }: BottomSheet) {
  const { sheet, content, currentHeight, currentState, setCurrentState } = useBottomSheet(isOpen);

  useEffect(() => {
    setCurrentState(isOpen ? 'mid' : 'close');
  }, [isOpen, setCurrentState]);

  return (
    <div
      className={`
        ${currentState}
    flex flex-col
    absolute top-[calc(100%-90px)]
    z-10
    left-0 right-0
    rounded-t-lg
    shadow-[0_0_10px_rgba(0,0,0,0.6)]
    bg-white
    transition-transform duration-650 ease-out 
    ${currentState == 'max' ? '' : 'pb-[70px]'}
  `}
      style={{
        height: `${currentHeight}px`,
      }}
      ref={sheet}
    >
      <Header />
      <div className="overflow-auto overscroll-contain scrollbar-thin scrollbar-thumb-main_2" ref={content}>
        {view}
      </div>
    </div>
  );
}

export default BottomSheet;
