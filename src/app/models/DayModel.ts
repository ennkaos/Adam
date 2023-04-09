import { AppointmentModel } from './AppointmentModel';

export interface DayModel {
  id: string;
  name: string;
  appointments: [AppointmentModel];
}
