import { useEffect } from 'react';
import useBottomSheet from '../../hooks/useBottomSheet';
import Header from './Header';
import { BOTTOM_SHEET_HEIGHT_MAX } from '../../constants/BottomSheetOption';
import { useBottomSheetStore } from '../../store/bottomSheetStore';
import MaxHeader from './MaxHeader';

function BottomSheet() {
  const { view, viewName, isOpen, closeBottomSheet, resultCount } = useBottomSheetStore();
  const { sheet, content, currentState, setCurrentState } = useBottomSheet();

  useEffect(() => {
    setCurrentState(isOpen ? 'mid' : 'close');
  }, [isOpen, setCurrentState]);

  return (
    <div
      className={` ${currentState} duration-650 fixed left-0 right-0 top-[calc(100%-165px)] z-20 mx-auto flex max-w-[500px] flex-col rounded-t-lg bg-bg shadow-[0_-6px_10px_-5px_rgba(0,0,0,0.6)] transition-transform ease-out ${currentState == 'max' ? '' : 'pb-[280px]'} `}
      style={{
        height: `${BOTTOM_SHEET_HEIGHT_MAX}px`,
      }}
      ref={sheet}
    >
      {currentState == 'max' ? (
        <MaxHeader closeBottomSheet={closeBottomSheet} viewName={viewName} resultCount={resultCount} />
      ) : (
        <Header />
      )}
      <div className="overflow-auto overscroll-contain scrollbar-hide" ref={content}>
        {view ? view({ currentState }) : null}
      </div>
    </div>
  );
}

export default BottomSheet;
