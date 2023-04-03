import { AppointmentModel } from './AppointmentModel';

export interface SubGrupsModel {
  id: number;
  week: [AppointmentModel];
}
