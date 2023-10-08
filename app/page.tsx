'use client';

import { useEffect, useState } from 'react';

import Summary from '@/components/summary';
import Footer from '@/components/footer';
import Person from '@/components/person';
import { useStorage } from '@/hooks/use-storage';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const courses = useStorage((state) => state.courses);
  const removeCourse = useStorage((state) => state.removeCourse);
  const target = useStorage((state) => state.target);
  const setTarget = useStorage((state) => state.updateTarget);
  const mentor = useStorage((state) => state.mentor);

  const handleDeleteItem = (id) => removeCourse(id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <main className="container mt-8 mb-2">
        <h1 className="text-5xl mb-10">Izračun satnice</h1>

        <p className="my-4">
          Aplikacija za izračun radnih sati prema odluci Fakultetskog vijeća
          FESB-a.{' '}
          <span className="font-semibold">Ovo nije službeni izračun.</span>{' '}
          Koristite na vlastitu odgovornost.
        </p>

        {/*<Person hours={target} onHoursChange={handleTargetChange} />*/}
        <Person hours={target} onHoursChange={setTarget} />

        <Summary
          courses={courses}
          target={target}
          mentor={+mentor * 96}
          onDeleteItem={handleDeleteItem}
        />
      </main>
      <Footer />
    </div>
  );
}
