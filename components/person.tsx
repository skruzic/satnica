'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useStorage } from '@/hooks/use-storage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PersonProps {
  hours: number;
  onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Person: React.FC<PersonProps> = ({ hours, onHoursChange }) => {
  const { mentor, toggleMentor } = useStorage();
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Postavke izračuna</CardTitle>
        <CardDescription>
          Upišite Vašu godišnju satnicu za nastavu, te mentorirate li završne i
          diplomske radove
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-between rounded-lg border p-4 my-4">
          <div className="w-full space-y-0.5">
            <Label>Godišnja nastava (broj sati)</Label>
            <Input
              type="number"
              step="0.1"
              value={hours}
              onChange={onHoursChange}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="mentor" className="text-base">
              Mentorski rad
            </Label>
            <p className="text-sm text-muted-foreground">
              Mentoriranje završnih i diplomskih radova
            </p>
          </div>
          <Switch id="mentor" checked={mentor} onCheckedChange={toggleMentor} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Person;
