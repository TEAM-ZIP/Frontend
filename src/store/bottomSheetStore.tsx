import { create } from 'zustand';

interface BottomSheetState {
  view: ((props: { currentState: string }) => React.ReactNode) | null;
  viewName: string;
  isOpen: boolean;
  setBottomSheet: (view: ((props: { currentState: string }) => React.ReactNode) | null, viewName: string) => void;
  closeBottomSheet: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  view: null,
  viewName: '',
  isOpen: false,
  setBottomSheet: (view, viewName) => set({ view, viewName, isOpen: true }),
  closeBottomSheet: () => set({ isOpen: false, view: null, viewName: '' }),
}));
