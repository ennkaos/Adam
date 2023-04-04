import { AppointmentModel } from './AppointmentModel';

export interface SubGrupsModel {
  id: number;
  name: string;
  days: [AppointmentModel];
}
