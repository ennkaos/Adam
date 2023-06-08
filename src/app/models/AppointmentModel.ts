export interface AppointmentModel {
  id: number;

  name: string;

  groups: boolean;

  teacherName: string;

  dayNumber: number;

  subjectName: string;

  roomName: string;

  startTimeSlot: number;

  timeSlotsUsed: number;

  isOnParity: number;

  isLab: boolean;

  group: string;

  serie: string;
  subgroup: number;
}

export enum Parity {
  even = 'even',
  both = 'both',
  odd = 'odd',
}
