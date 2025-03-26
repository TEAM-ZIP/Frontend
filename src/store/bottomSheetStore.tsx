import { create } from 'zustand';

interface BottomSheetState {
  view: ((props: { currentState: string }) => React.ReactNode) | null;
  viewName: string;
  isOpen: boolean;
  prevView: ((props: { currentState: string }) => React.ReactNode) | null;
  prevViewName: string;
  resultCount: number;
  setBottomSheet: (
    view: ((props: { currentState: string }) => React.ReactNode) | null,
    viewName: string,
    resultCount?: number,
  ) => void;
  closeBottomSheet: () => void;
  restoreBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  view: null,
  viewName: '',
  isOpen: false,
  prevView: null,
  prevViewName: '',
  resultCount: 0,

  setBottomSheet: (view, viewName, resultCount = 0) =>
    set((state) => {
      return {
        prevView: state.view ?? state.prevView, // 기존 prevView가 있으면 유지
        prevViewName: state.viewName ?? state.prevViewName,
        view,
        viewName,
        resultCount,
        isOpen: true,
      };
    }),

  closeBottomSheet: () => {
    set({ isOpen: false, view: null, viewName: '', resultCount: 0 });
  },

  restoreBottomSheet: () =>
    set((state) => {
      if (state.prevView) {
        return {
          view: state.prevView,
          viewName: state.prevViewName,
          isOpen: true,
        };
      }
      return { ...state, isOpen: false, prevView: null, prevViewName: '', resultCount: 0 };
    }),
}));
