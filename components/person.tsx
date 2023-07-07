'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useStorage } from '@/hooks/use-storage';

interface PersonProps {
  hours: number;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Person: React.FC<PersonProps> = ({ hours, onHoursChange }) => {
  const { mentor, toggleMentor } = useStorage();
  return (
    <div className="grid grid-cols-3 items-center">
      <div className="mt-5 mb-2">
        <Label>Godišnja nastava (broj sati)</Label>
        <Input
          className="w-1/3"
          type="number"
          step="0.1"
          value={hours}
          onChange={onHoursChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="mentor" checked={mentor} onCheckedChange={toggleMentor} />
        <Label htmlFor="mentor">Mentorski rad</Label>
      </div>
    </div>
  );
};

export default Person;
