import { AppointmentModel } from './AppointmentModel';

export interface DayModel {
  id: string;
  name: string;
  reservations: [AppointmentModel];
}
