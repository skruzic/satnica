import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useStorageStore {
  data: any;
  target: number;
  updateData: (data: any) => void;
  updateTarget: (target: number) => void;
}

const useStorage = create(
  persist<useStorageStore>(
    (set, get) => ({
      data: [],
      target: 0,
      updateData: (params) => {
        set((state) => ({
          data: params,
        }));
      },
      updateTarget: (params) => {
        set((state) => ({
          target: params,
        }));
      },
    }),
    {
      name: 'storage',
    }
  )
);

export default useStorage;
