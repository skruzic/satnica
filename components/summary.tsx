'use client';

/*import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';*/
import DeleteIcon from '@mui/icons-material/Delete';
import {
  computeWorkHours,
  computeTotalWorkHours,
  nonRepetitive,
  rnri,
} from '../utils/calculations';
import { Course } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

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
  return (
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteItem(row.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} align="right">
            Ukupno sati
          </TableCell>
          <TableCell align="right">
            {computeTotalWorkHours(courses).toFixed(2)}
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
  );
};

export default Summary;
