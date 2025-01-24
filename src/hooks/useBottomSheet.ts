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

      if (!isContentAreaTouched) {
        return true;
      }

      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0;
      }
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        // 맨 처음 앱 시작하고 시작시
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty('transform', `translateY(${nextSheetY - MAX_Y}px)`); //바닥 만큼은 빼야쥬...
      } else {
        document.body.style.overflowY = 'hidden';
      }
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
            setCurrentState('mid');
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
          } else if (isMovingUp) {
            sheet.current!.style.setProperty('transform', `translateY(${MIN_Y - MAX_Y}px)`); // 중간 -> 최대
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MAX);
            setCurrentState('max');
          }
        } else if (currentSheetY <= MAX_Y && currentSheetY > MID_Y) {
          if (isMovingDown) {
            sheet.current!.style.setProperty('transform', `translateY(64px)`); // 중간 -> 최소
            setCurrentState('close');
          } else if (isMovingUp) {
            sheet.current!.style.setProperty('transform', `translateY(${MID_Y - MAX_Y}px)`); // 최소 -> 중간
            setCurrentState('mid');
            setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
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
    sheet.current!.addEventListener('touchmove', handleTouchMove);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener('touchstart', handleTouchStart);
  }, []);

  return { sheet, content, currentHeight, currentState, setCurrentState };
}
