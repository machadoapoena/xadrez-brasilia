// Define global TypeScript types, interfaces, and enums here

export enum TournamentType {
  BLITZ = 'Blitz',
  RAPID = 'Rápido',
  PENSADO = 'Pensado',
  NINETY_SIXTY = '960',
  PESADO = 'Pesado',
  CLASSIC = 'Clássico',
  ARENA = 'Arena'
}

export interface Event {
  id: string | number;
  name: string;
  description?: string;
  types: TournamentType[] | string[];
  date: string;
  time: string;
  location: string;
  city?: string;
  state?: string;
  prize: string;
  contact?: string;
  link_details?: string;
  link_registration?: string;
  link_chessresults?: string;
  rtg_fide?: boolean;
  rtd_cbx?: boolean;
  rtg_lbx?: boolean;
  incricao_pix?: string;
  favorecido_pix?: string;
  image_url: string;
  status?: string;
  created_at?: string;
  day?: number;
  monthIndex?: number;
  year?: number;
}

export interface Tournament extends Event {
  month: string;
}

export interface Partner {
  id: string | number;
  name: string;
  role: string;
  contact: string;
  instagram?: string;
  image: string;
  description: string;
}

export interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDayClick: (day: number, monthIndex: number) => void;
}

export interface TimelineProps {
  selectedDay: number | null;
  selectedMonthIndex: number | null;
  onDayClick: (day: number, monthIndex: number) => void;
  onOpenCalendar: () => void;
}
