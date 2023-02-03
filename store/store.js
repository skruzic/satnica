import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStorage = create(
  persist(
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
