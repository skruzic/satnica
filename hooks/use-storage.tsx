import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { Course } from '@/types';

interface useStorageStore {
  courses: Course[];
  target: number;
  mentor: boolean;
  updateTarget: (target: number) => void;
  addCourse: (data: Course) => void;
  removeCourse: (id: string) => void;
  toggleMentor: () => void;
}

export const useStorage = create(
  persist<useStorageStore>(
    (set, get) => ({
      courses: [],
      target: 405,
      mentor: false,
      updateTarget: (params) => set({ target: params }),
      addCourse: (data) =>
        set({ courses: [...get().courses, { id: uuidv4(), ...data }] }),
      removeCourse: (id: string) =>
        set({
          courses: [...get().courses.filter((course) => course.id !== id)],
        }),
      toggleMentor: () => set({ mentor: !get().mentor }),
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
