
import { TournamentType } from './constants.tsx';

export const getBadgeStyles = (type: TournamentType) => {
  switch (type) {
    case 'Blitz': return 'bg-red-500 text-white';
    case 'Rápido': return 'bg-yellow-400 text-blue-900';
    case 'Pensado': return 'bg-green-600 text-white';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};
