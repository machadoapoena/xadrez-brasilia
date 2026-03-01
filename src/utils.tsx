
import { TournamentType } from './constants.tsx';

export const getBadgeStyles = (type: TournamentType) => {
  switch (type) {
    case TournamentType.BLITZ: return 'bg-red-500 text-white';
    case TournamentType.RAPID: return 'bg-yellow-400 text-blue-900';
    case TournamentType.CLASSIC: return 'bg-green-600 text-white';
    case TournamentType.ARENA: return 'bg-purple-600 text-white';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};
