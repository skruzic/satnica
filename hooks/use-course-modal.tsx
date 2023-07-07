import { create } from 'zustand';

interface useCourseModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCourseModal = create<useCourseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
