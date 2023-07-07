import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { Course } from '@/types';

interface useStorageStore {
  courses: Course[];
  target: number;
  updateTarget: (target: number) => void;
  addCourse: (data: Course) => void;
  removeCourse: (id: string) => void;
}

const useStorage = create(
  persist<useStorageStore>(
    (set, get) => ({
      courses: [],
      target: 405,
      updateTarget: (params) => set({ target: params }),
      addCourse: (data) =>
        set({ courses: [...get().courses, { id: uuidv4(), ...data }] }),
      removeCourse: (id: string) =>
        set({
          courses: [...get().courses.filter((course) => course.id !== id)],
        }),
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStorage;
