import React, { useEffect } from 'react';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import { IoCloseOutline } from 'react-icons/io5';
import { BOTTOM_SHEET_HEIGHT_MAX } from '../../constants/BottomSheetOption';
interface BottomSheet {
  view: ((props: { currentState: string }) => React.ReactNode) | null;
  isOpen: boolean;
  viewName: string;
}

function BottomSheet({ view, isOpen, viewName }: BottomSheet) {
  const { sheet, content, currentState, setCurrentState } = useBottomSheet(isOpen);

  useEffect(() => {
    setCurrentState(isOpen ? 'mid' : 'close');
  }, [isOpen, setCurrentState]);

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
          <div
            className="flex cursor-pointer items-center justify-center p-2.5"
            onClick={() => setCurrentState('close')}
          >
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
