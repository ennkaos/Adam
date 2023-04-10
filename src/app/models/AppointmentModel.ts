export interface AppointmentModel {
  id: number;

  groups: string;

  teachersName: string;

  dayNumber: number;

  subjectName: string;

  className: string;

  roomId: number;

  startTimeSlot: number;

  timeSlotsUsed: number;

  IsOnParity: Parity;

  IsLab: boolean;

  group: string;
}

enum Parity {
  even,
  both,
  odd,
}
