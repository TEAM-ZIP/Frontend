import React from 'react';
import { BOTTOM_SHEET_HEIGHT } from '../../constants/BottomSheetOption';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import UserLikeZip from '../../pages/UserLikeZip';

function BottomSheet() {
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
        transform: 'translateY(65px)',
      }}
      ref={sheet}
    >
      <Header />
      <div className="overflow-auto overscroll-contain" ref={content}>
        <UserLikeZip />
      </div>
    </div>
  );
}

export default BottomSheet;
