import { Course } from '@/types';

export const computeWorkHours = (
  type: string,
  hours: number,
  groups: number,
  students: number,
  scale: number
) => {
  let NR = 0,
    RR = 0;

  switch (type) {
    case 'P':
      if (students <= 5) {
        NR = 1.6;
        RR = 1.1;
      } else if (students > 5 && students <= 9) {
        NR = 2.4;
        RR = 1.6;
      } else if (students >= 10 && students <= 59) {
        NR = 3.2;
        RR = 2.1;
      } else if (students >= 60 && students <= 89) {
        NR = 3.4;
        RR = 2.2;
      } else if (students >= 90 && students <= 120) {
        NR = 3.7;
        RR = 2.4;
      }
      break;
    case 'S':
      if (students <= 5) {
        NR = 1.2;
        RR = 0.9;
      } else if (students > 5 && students <= 9) {
        NR = 1.8;
        RR = 1.3;
      } else if (students >= 10 && students <= 35) {
        NR = 2.4;
        RR = 1.7;
      }
      break;
    case 'AV':
      if (students <= 5) {
        NR = 0.8;
        RR = 0.7;
      } else if (students > 5 && students <= 9) {
        NR = 1.2;
        RR = 1.0;
      } else if (students >= 10) {
        NR = 1.6;
        RR = 1.3;
      }
      break;
    case 'LV':
      if (students <= 5) {
        NR = 0.8;
        RR = 0.7;
      } else if (students > 5) {
        NR = 1.6;
        RR = 1.3;
      }
      break;
    default:
      break;
  }

  return 13 * hours * ((groups - 1) * RR + NR) * scale;
};

export const computeTotalWorkHours = (data: Course[]) => {
  return data.reduce(
    (acc, item) =>
      acc +
      computeWorkHours(
        item.type,
        item.hours,
        item.groups,
        item.students,
        item.scale
      ),
    0
  );
};

export const rnri = (data: Course[], target = 405) => {
  return (
    nonRepetitive(data) * 0.6 * target +
    (1 - nonRepetitive(data)) * 0.5 * target
  );
};

export const nonRepetitive = (data: Course[]) => {
  let nrp = 0;

  const total = data.reduce((acc, item) => {
    if (item.groups > 1) {
      nrp += item.hours;
    } else {
      nrp += item.groups * item.hours;
    }

    return acc + item.groups * item.hours;
  }, 0);

  if (total !== 0) {
    return nrp / total;
  } else {
    return 1.0;
  }
};
