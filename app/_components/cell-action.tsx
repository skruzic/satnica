'use client';

import { Edit, Trash } from 'lucide-react';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useModal } from '@/hooks/use-modal-store';
import { Course } from '@/types';
import { useStorage } from '@/hooks/use-storage';

interface CellActionProps {
  data: Course;
}

export const CellAction = ({ data }: CellActionProps) => {
  const { onOpen } = useModal();
  const storage = useStorage();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onOpen('editCourse', { course: data })}
              className="mr-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Uredi</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ConfirmModal onConfirm={() => storage.removeCourse(data.id)}>
              <Button variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </ConfirmModal>
          </TooltipTrigger>
          <TooltipContent>
            <p>Izbriši</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
