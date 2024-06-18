"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { computeTotalWorkHours, nonRepetitive, rnri } from "@/lib/calculations";
import { Course } from "@/types";

interface SummaryProps {
  courses: Course[];
  target: number;
  mentor: number;
}

const Summary = ({ courses, target, mentor }: SummaryProps) => {
  //const courseModal = useCourseModal();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType, course: Course) => {
    e.stopPropagation();
    onOpen(action, { course });
  };

  return (
    <Card className="w-full sm:w-1/2 my-4">
      <CardHeader>
        <CardTitle>Nastavno opterećenje</CardTitle>
        <CardDescription>Sumarni pregled</CardDescription>
      </CardHeader>
      <CardContent>
        {courses.length === 0 && <div>Trenutno nema dodanih predmeta.</div>}
        {courses.length > 0 && (
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Ukupno sati</TableHead>
                <TableCell align="right">
                  {(computeTotalWorkHours(courses) + mentor).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableHead>Udio nerepetitivne nastave</TableHead>
                <TableCell align="right">
                  {nonRepetitive(courses).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableHead>Udio repetitivne nastave</TableHead>
                <TableCell align="right">
                  {(1 - nonRepetitive(courses)).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableHead>RNRI</TableHead>
                <TableCell align="right">
                  {rnri(courses, target).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableHead>Prekovremeni rad</TableHead>
                <TableCell align="right">
                  {(
                    computeTotalWorkHours(courses) +
                    mentor -
                    rnri(courses, target)
                  ).toFixed(2)}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default Summary;
