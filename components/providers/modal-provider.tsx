'use client';

import { useEffect, useState } from 'react';
import { CreateCourseModal } from '../modals/create-course-modal';
import { EditCourseModal } from '../modals/edit-course-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateCourseModal />
      <EditCourseModal />
    </>
  );
};
