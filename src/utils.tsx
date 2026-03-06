
import { TournamentType } from './types';

export const getBadgeStyles = (type: TournamentType | string) => {
  switch (type) {
    case TournamentType.BLITZ:
    case 'Blitz':
      return 'bg-red-500 text-white';
    case TournamentType.RAPID:
    case 'Rápido':
      return 'bg-yellow-400 text-blue-900';
    case TournamentType.PENSADO:
    case TournamentType.CLASSIC:
    case 'Pensado':
    case 'Clássico':
      return 'bg-green-600 text-white';
    case TournamentType.ARENA:
    case 'Arena':
      return 'bg-purple-600 text-white';
    default: return 'bg-gray-200 text-gray-800';
  }
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};
