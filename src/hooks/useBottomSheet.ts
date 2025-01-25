import { useRef, useEffect, useState } from 'react';
import { MIN_Y, MAX_Y, MID_Y, BOTTOM_SHEET_HEIGHT_MAX, BOTTOM_SHEET_HEIGHT_MID } from '../constants/BottomSheetOption';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  isContentAreaTouched: boolean;
}

export default function useBottomSheet(initialState: 'close' | 'mid' | 'max' = 'close') {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState(BOTTOM_SHEET_HEIGHT_MAX);
  const [currentState, setCurrentState] = useState<'close' | 'mid' | 'max'>(initialState);
  const [translateY, setTranslateY] = useState(`${MAX_Y - MIN_Y}px`);

  useEffect(() => {
    if (sheet.current) {
      sheet.current.style.transition = 'transform 0.1s ease, height 0.1s ease'; // Height와 Transform 동기화
    }
  }, []);

  useEffect(() => {
    switch (currentState) {
      case 'close':
        setTranslateY(`64px`);
        setCurrentHeight(BOTTOM_SHEET_HEIGHT_MAX);
        break;
      case 'mid':
        setTranslateY(`${MID_Y - MAX_Y}px`);
        setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
        break;
      case 'max':
        setTranslateY(`${MIN_Y - MAX_Y}px`);
        setCurrentHeight(BOTTOM_SHEET_HEIGHT_MAX);
        break;
      default:
        break;
    }
  }, [currentState]);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      if (isContentAreaTouched) {
        const contentElement = content.current!;
        const scrollableElement = contentElement.querySelector('[data-scrollable]'); // 스크롤 가능한 내부 요소 찾기

        console.log(currentState);
        if (scrollableElement) {
          const isScrollable = scrollableElement.scrollHeight > scrollableElement.clientHeight; // 내부 요소가 스크롤 가능한지 확인
          const isAtTop = scrollableElement.scrollTop <= 0; // 내부 요소가 맨 위인지 확인
          const isAtBottom =
            scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight; // 내부 요소가 맨 아래인지 확인

          console.log('내부 스크롤 가능?', isScrollable);
          console.log('내부 맨 위?', isAtTop);
          console.log('내부 맨 아래?', isAtBottom);
          console.log(touchMove.movingDirection);

          if (isScrollable) {
            if (touchMove.movingDirection === 'down' && isAtTop) {
              console.log('이거');
              return true; // 맨 위에서 아래로 드래그 시 바텀시트 이동 허용
            }
            if (touchMove.movingDirection === 'up' && isAtBottom) {
              console.log('저거');
              return true; // 맨 아래에서 위로 드래그 시 바텀시트 이동 허용
            }
            console.log('바텀시트 이동안해');
            return false; // 내부 요소가 스크롤 가능한 경우 바텀시트 이동 금지
          }
        }
      }

      // 내부 스크롤 불가능한 경우 바텀시트 이동 허용
      return true;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;

      // 터치가 컨텐츠 영역에서 시작되었는지 확인
      const isTouchOnContent = content.current!.contains(e.target as Node);
      console.log(isTouchOnContent);
      metrics.current.isContentAreaTouched = isTouchOnContent;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      } else if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      const canMoveBottomSheet = canUserMoveBottomSheet();

      console.log('이동가능?', canMoveBottomSheet);
      // 바텀시트 이동 가능 여부 확인
      if (canMoveBottomSheet) {
        e.preventDefault(); // 바텀시트 이동을 위해 기본 동작 차단

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        } else if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`);
      } else {
        // 내부 콘텐츠 스크롤을 허용
        console.log('스크롤 허용');
        document.body.style.overflowY = 'auto';
      }
      touchMove.prevTouchY = currentTouch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        const isMovingDown = touchMove.movingDirection === 'down';
        const isMovingUp = touchMove.movingDirection === 'up';

        if (currentSheetY <= MID_Y && currentSheetY > MIN_Y) {
          if (isMovingDown) {
            sheet.current!.style.setProperty('transform', `translateY(${MID_Y - MAX_Y}px)`); // 최대 -> 중간
            console.log(currentHeight);
            setCurrentState('mid');
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
            console.log(currentHeight);
          } else if (isMovingUp) {
            sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`); // 중간 -> 최대
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MAX);
            setCurrentState('max');
            console.log(currentHeight);
          }
        } else if (currentSheetY <= MAX_Y && currentSheetY > MID_Y) {
          if (isMovingDown) {
            sheet.current!.style.setProperty('transform', `translateY(64px)`); // 중간 -> 최소
            setCurrentState('close');
            console.log(currentHeight);
          } else if (isMovingUp) {
            sheet.current!.style.setProperty('transform', `translateY(${MID_Y - MAX_Y}px)`); // 최소 -> 중간
            setCurrentState('mid');
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
            console.log(currentHeight);
          }
        }
      }

      if (currentSheetY <= MID_Y && currentSheetY > MIN_Y) {
        setCurrentState(currentSheetY < (MID_Y + MIN_Y) / 2 ? 'max' : 'mid');
      } else if (currentSheetY <= MAX_Y && currentSheetY > MID_Y) {
        setCurrentState(currentSheetY < (MAX_Y + MID_Y) / 2 ? 'mid' : 'close');
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current!.addEventListener('touchstart', handleTouchStart);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
    sheet.current!.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener('touchstart', handleTouchStart);
  }, []);

  return { sheet, content, currentHeight, currentState, setCurrentState };
}
