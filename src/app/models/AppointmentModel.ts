export interface AppointmentModel {
  id: number;

  groups: boolean;

  teacherName: string;

  dayNumber: number;

  subjectName: string;

  roomName: string;

  roomId: number;

  startTimeSlot: number;

  timeSlotsUsed: number;

  IsOnParity: Parity;

  isLab: boolean;

  group: string;
}

export enum Parity {
  even = 'even',
  both = 'both',
  odd = 'odd',
}
