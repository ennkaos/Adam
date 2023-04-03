import { SubGrupsModel } from './SubGrupsModel';

export interface GroupModel {
  id: number;
  nume: string;
  subgrupa: [SubGrupsModel];
}
