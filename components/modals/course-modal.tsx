'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { useCourseModal } from '@/hooks/use-course-modal';
import { Modal } from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStorage } from '@/hooks/use-storage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Course } from '@/types';

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  hours: z.coerce.number(),
  groups: z.coerce.number(),
  students: z.coerce.number(),
  scale: z.coerce.number().gte(0).lte(1),
});

const CourseModal = () => {
  const courseModal = useCourseModal();
  const storage = useStorage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      hours: 0,
      groups: 0,
      students: 0,
      scale: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    storage.addCourse(values as Course);
    form.reset();
    courseModal.onClose();
  };

  return (
    <Modal
      title="Novi predmet"
      description="Unesi novi predmet za izračun satnice"
      isOpen={courseModal.isOpen}
      onClose={courseModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime predmeta</FormLabel>
                      <FormControl>
                        <Input placeholder="Ime predmeta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vrsta nastave</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberi vrstu nastave" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="P">Predavanja</SelectItem>
                          <SelectItem value="S">Seminari</SelectItem>
                          <SelectItem value="AV">Auditorne vježbe</SelectItem>
                          <SelectItem value="LV">
                            Laboratorijske vježbe
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj sati</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Broj sati"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tjedni broj sati za odabranu vrstu nastave
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="groups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj grupa</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Broj grupa"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Broj grupa za odabranu vrstu nastave
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj studenata</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Broj studenata"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Prosječan broj studenata u grupi
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="scale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faktor skaliranja</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          placeholder="Broj između 0 i 1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Udio nastave ako nastavnik drži manje od 100% nastave
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button variant="outline" onClick={courseModal.onClose}>
                    Poništi
                  </Button>
                  <Button type="submit">Sačuvaj</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
