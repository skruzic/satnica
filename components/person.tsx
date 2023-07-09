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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PersonProps {
  hours: number;
  //onHoursChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHoursChange: (value: number) => void;
}

const Person: React.FC<PersonProps> = ({ hours, onHoursChange }) => {
  const { mentor, toggleMentor, target, updateTarget } = useStorage();

  const handleHoursChange = (value: string) => {
    onHoursChange(Number(value));
  };

  return (
    <Card className="w-full sm:w-1/2 my-4">
      <CardHeader>
        <CardTitle>Postavke izračuna</CardTitle>
        <CardDescription>
          Odaberite Vaše zvanje ili upišite godišnju satnicu za nastavu (ukoliko
          se razlikuje od predviđene GKO), te mentorirate li završne i diplomske
          radove.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-between rounded-lg border p-4 my-4">
          <div className="w-full space-y-0.5">
            <Label>Zvanje</Label>
            <Select onValueChange={(value) => updateTarget(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Odaberite zvanje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="810">Znansveno-nastavna zvanja</SelectItem>
                <SelectItem value="1215">Nastavna zvanja</SelectItem>
                <SelectItem value="405">Asistent</SelectItem>
                <SelectItem value="608.4">Viši asistent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between rounded-lg border p-4 my-4">
          <div className="w-full space-y-0.5">
            <Label>Godišnja nastava (broj sati)</Label>
            <Input
              type="number"
              step="0.1"
              value={hours}
              onChange={(e) => updateTarget(Number(e.target.value))}
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
