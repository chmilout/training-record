import { type TData } from '../types';

const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.').map(Number);
  const fullYear = 2000 + year;
  return new Date(fullYear, month - 1, day);
};

export const sortTrainingsByDate = (trainings: TData[]): TData[] => {
  return [...trainings].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );
};
