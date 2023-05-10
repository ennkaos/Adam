import { DayModel } from './DayModel';

export interface SubGrupsModel {
  id: number;
  name: string;
  week: [DayModel];
}
