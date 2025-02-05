import { useRef, useEffect, useState } from 'react';
import { MIN_Y, MAX_Y, MID_Y, BOTTOM_SHEET_HEIGHT_MAX, BOTTOM_SHEET_HEIGHT_MID } from '../constants/BottomSheetOption';
import { useBottomSheetStore } from '../store/bottomSheetStore';

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

export default function useBottomSheet() {
  const { setBottomSheet, closeBottomSheet, isOpen } = useBottomSheetStore();
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState(BOTTOM_SHEET_HEIGHT_MAX);
  const [currentState, setCurrentState] = useState<'close' | 'mid' | 'max'>(isOpen ? 'mid' : 'close');
  const currentStateRef = useRef<'close' | 'mid' | 'max'>(currentState);

  useEffect(() => {
    setCurrentState(isOpen ? 'mid' : 'close');
  }, [isOpen]);

  useEffect(() => {
    currentStateRef.current = currentState;
  }, [currentState]);

  const getTranslateY = () => {
    switch (currentState) {
      case 'max':
        return `${MIN_Y - MAX_Y}px`;
      case 'mid':
        return `${MID_Y - MAX_Y}px`;
      default:
        return '65px';
    }
  };

  useEffect(() => {
    if (sheet.current) {
      sheet.current.style.transition = 'transform 0.1s ease';
      sheet.current.style.transform = `translateY(${getTranslateY()})`;
    }
  }, [currentState]);

  useEffect(() => {
    switch (currentState) {
      case 'close':
        setCurrentHeight(BOTTOM_SHEET_HEIGHT_MAX);
        break;
      case 'mid':
        setCurrentHeight(BOTTOM_SHEET_HEIGHT_MID);
        break;
      case 'max':
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
      const currentStateValue = currentStateRef.current;

      // console.log(currentStateValue);

      // 상태가 mid인 경우 바텀시트는 무조건 이동
      if (currentStateValue === 'mid') {
        return true;
      }

      if (currentStateValue === 'max' && isContentAreaTouched) {
        const contentElement = content.current!;
        const scrollableElement = contentElement.querySelector('[data-scrollable]'); // 스크롤 가능한 내부 요소 찾기

        if (scrollableElement) {
          const isAtTop = scrollableElement.scrollTop <= 0; // 내부 요소가 맨 위인지 확인

          // 방향이 down이고 스크롤이 맨 위에 있을 때만 바텀시트 이동 허용
          if (touchMove.movingDirection === 'down' && isAtTop) {
            return true;
          }
          // 다른 경우 내부 스크롤 우선 허용
          return false;
        }
      }
      // 기본적으로 바텀시트 이동 허용
      return true;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;

      // 터치가 컨텐츠 영역에서 시작되었는지 확인
      const isTouchOnContent = content.current!.contains(e.target as Node);
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
        requestAnimationFrame(() => {
          const scrollableElement = content.current?.querySelector('[data-scrollable]');
          if (scrollableElement instanceof HTMLElement) {
            console.log('잘됨');
            scrollableElement.style.overflowY = 'auto';
          }
        });
      }
      touchMove.prevTouchY = currentTouch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      const canMoveBottomSheet = canUserMoveBottomSheet();

      if (!canMoveBottomSheet) {
        // 내부 스크롤이 필요한 경우, 바텀시트 동작을 막음
        console.log('내부 스크롤 중 - 바텀시트 동작 차단');
        return;
      }

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
            console.log('최대, 중간', BOTTOM_SHEET_HEIGHT_MID, 'state', currentState);
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
