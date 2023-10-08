'use client';

import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { computeWorkHours } from '@/lib/calculations';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Predmet
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Vrsta nastave',
  },
  {
    accessorKey: 'hours',
    header: 'Broj sati',
  },
  {
    accessorKey: 'groups',
    header: 'Broj grupa',
  },
  {
    accessorKey: 'students',
    header: 'Broj studenata',
  },
  {
    accessorKey: 'scale',
    header: 'Postotak nastave',
    cell: ({ row }) => <p>{`${row.original.scale * 100} %`}</p>,
  },
  {
    accessorKey: 'total',
    header: 'Ukupno radnih sati',
    cell: ({ row }) => (
      <p>
        {computeWorkHours(
          row.original.type,
          row.original.hours,
          row.original.groups,
          row.original.students,
          row.original.scale
        ).toFixed(2)}
      </p>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
