import React, { useEffect } from 'react';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import { IoCloseOutline } from 'react-icons/io5';
import { BOTTOM_SHEET_HEIGHT_MAX } from '../../constants/BottomSheetOption';
import { useBottomSheetStore } from '../../store/bottomSheetStore';

function BottomSheet() {
  const { view, viewName, isOpen, closeBottomSheet } = useBottomSheetStore();
  const { sheet, content, currentState, setCurrentState } = useBottomSheet();

  useEffect(() => {
    setCurrentState(isOpen ? 'mid' : 'close');
  }, [isOpen, setCurrentState]);

  useEffect(() => {
    console.log('바텀시트 상태 변경:', isOpen);
  }, [isOpen]);

  return (
    <div
      className={`
        ${currentState}
    flex flex-col
    fixed top-[calc(100%-165px)]
    max-w-[500px]
    z-20
    left-0 right-0
    mx-auto
    rounded-t-lg
    shadow-[0_-6px_10px_-5px_rgba(0,0,0,0.6)]
    bg-white
    transition-transform duration-650 ease-out 
    ${currentState == 'max' ? '' : 'pb-[280px]'}
  `}
      style={{
        height: `${BOTTOM_SHEET_HEIGHT_MAX}px`,
      }}
      ref={sheet}
    >
      {currentState == 'max' ? (
        <div className="flex items-center px-2 py-3 mb-[-12px] bg-white">
          <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={closeBottomSheet}>
            <IoCloseOutline size={30} className="stroke-main_1" />
          </div>
          <div className="text-main_1 flex-1 text-center text-[20px] font-medium tracking-[-0.8px]">{viewName}</div>
          <div className="w-11" />
        </div>
      ) : (
        <Header />
      )}
      <div className="overflow-auto overscroll-contain scrollbar-thin scrollbar-thumb-main_2" ref={content}>
        {view ? view({ currentState }) : null}
      </div>
    </div>
  );
}

export default BottomSheet;
