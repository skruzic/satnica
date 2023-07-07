'use client';

import { Plus } from 'lucide-react';

import CourseModal from '@/components/modals/course-modal';
import Summary from '@/components/summary';
import Footer from '@/components/footer';
import Person from '@/components/person';
import { useStorage } from '@/hooks/use-storage';
import { Button } from '@/components/ui/button';
import { useCourseModal } from '@/hooks/use-course-modal';

export default function Home() {
  const courseModal = useCourseModal();

  const courses = useStorage((state) => state.courses);
  const removeCourse = useStorage((state) => state.removeCourse);
  const target = useStorage((state) => state.target);
  const setTarget = useStorage((state) => state.updateTarget);
  const mentor = useStorage((state) => state.mentor);

  const handleDeleteItem = (id) => removeCourse(id);

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  return (
    <div className="flex flex-col h-full">
      <main className="container mt-8 mb-2">
        <h1 className="text-5xl mb-10">Izračun satnice</h1>

        <p>
          Aplikacija za izračun radnih sati prema odluci Fakultetskog vijeća
          FESB-a.{' '}
          <span className="font-semibold">Ovo nije službeni izračun.</span>{' '}
          Koristite na vlastitu odgovornost.
        </p>

        <Person hours={target} onHoursChange={handleTargetChange} />

        <div className="my-2">
          <Button onClick={courseModal.onOpen}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj predmet
          </Button>
        </div>

        {courses.length > 0 && (
          <Summary
            courses={courses}
            target={target}
            mentor={+mentor * 96}
            onDeleteItem={handleDeleteItem}
          />
        )}

        <CourseModal />
      </main>
      <Footer />
    </div>
  );
}
