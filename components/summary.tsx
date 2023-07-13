'use client';

import { Plus, Trash, Edit } from 'lucide-react';

import { Course } from '@/types';
import {
  computeWorkHours,
  computeTotalWorkHours,
  nonRepetitive,
  rnri,
} from '@/utils/calculations';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCourseModal } from '@/hooks/use-course-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface SummaryProps {
  courses: Course[];
  target: number;
  mentor: number;
  onDeleteItem: (id: string) => void;
}

const Summary: React.FC<SummaryProps> = ({
  courses,
  target,
  mentor,
  onDeleteItem,
}) => {
  const courseModal = useCourseModal();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Pregled nastavnog opterećenja
          <Button className="ml-2" onClick={courseModal.onOpen}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj predmet
          </Button>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {courses.length === 0 && <div>Trenutno nema dodanih predmeta.</div>}
        {courses.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Predmet</TableHead>
                <TableHead>Vrsta nastave</TableHead>
                <TableHead>Broj sati</TableHead>
                <TableHead>Broj grupa</TableHead>
                <TableHead>Broj studenata u grupi</TableHead>
                <TableHead>Postotak nastave</TableHead>
                <TableHead>Ukupno radnih sati</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((row: Course) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.hours}</TableCell>
                  <TableCell>{row.groups}</TableCell>
                  <TableCell>{row.students}</TableCell>
                  <TableCell>{(row.scale * 100).toFixed(2)}%</TableCell>
                  <TableCell>
                    {computeWorkHours(
                      row.type,
                      row.hours,
                      row.groups,
                      row.students,
                      row.scale
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {/*<TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {}}
                            className="mr-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Uredi</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>*/}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onDeleteItem(row.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Izbriši</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
              {mentor > 0 && (
                <TableRow>
                  <TableCell colSpan={6}>Mentorski rad</TableCell>
                  <TableCell colSpan={2}>96.00</TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  Ukupno sati
                </TableCell>
                <TableCell align="right">
                  {(computeTotalWorkHours(courses) + mentor).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  Udio nerepetitivne nastave
                </TableCell>
                <TableCell align="right">
                  {nonRepetitive(courses).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  Udio repetitivne nastave
                </TableCell>
                <TableCell align="right">
                  {(1 - nonRepetitive(courses)).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  RNRI
                </TableCell>
                <TableCell align="right">{rnri(courses).toFixed(2)}</TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell colSpan={6} align="right">
                  Prekovremeni rad
                </TableCell>
                <TableCell align="right">
                  {(
                    computeTotalWorkHours(courses) +
                    mentor -
                    rnri(courses, target)
                  ).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Summary;
