export interface Day {
  date: number;
  isCurrentMonth: boolean;
}

export interface Reminder {
  id: number;
  date: Date; // O cualquier tipo de dato que estés utilizando para representar fechas
  text: string;
  city: string;
  color: string;
}

export interface Week {
  id: number;
  days: Day[];
}
