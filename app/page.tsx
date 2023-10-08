'use client';

import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import Footer from '@/components/footer';
import { Heading } from '@/components/heading';
import Person from '@/components/person';
import Summary from '@/components/summary';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useModal } from '@/hooks/use-modal-store';
import { useStorage } from '@/hooks/use-storage';

import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  const courses = useStorage((state) => state.courses);
  const removeCourse = useStorage((state) => state.removeCourse);
  const target = useStorage((state) => state.target);
  const setTarget = useStorage((state) => state.updateTarget);
  const mentor = useStorage((state) => state.mentor);

  const handleDeleteItem = (id) => removeCourse(id);

  const { onOpen } = useModal();

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
        <div className="flex gap-8">
          <Person hours={target} onHoursChange={setTarget} />

          <Summary courses={courses} target={target} mentor={+mentor * 96} />
        </div>

        <div className="flex items-center justify-between">
          <Heading title="Pregled nastavnog opterećenja" />
          <Button onClick={() => onOpen('createCourse')}>
            <Plus className="mr-2 w-4 h-4" />
            Novi predmet
          </Button>
        </div>
        <Separator className="my-4" />
        <DataTable columns={columns} data={courses} searchKey="name" />
      </main>
      <Footer />
    </div>
  );
}
