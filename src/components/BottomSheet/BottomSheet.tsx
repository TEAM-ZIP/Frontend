import React from 'react';
import { BOTTOM_SHEET_HEIGHT, MAX_Y, MIN_Y } from '../../constants/BottomSheetOption';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
interface BottomSheet {
  view: React.ReactNode;
  isOpen: boolean;
}

function BottomSheet({ view, isOpen }: BottomSheet) {
  const { sheet, content } = useBottomSheet();

  return (
    <div
      className={`
    flex flex-col
    absolute z-10
    top-[calc(100%-90px)]
    left-0 right-0
    rounded-t-lg
    shadow-[0_0_10px_rgba(0,0,0,0.6)]
    bg-white
    transition-transform duration-650 ease-out     
  `}
      style={{
        height: `${BOTTOM_SHEET_HEIGHT}px`,
        transform: `translateY(${isOpen ? '-404px' : '65px'})`,
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
