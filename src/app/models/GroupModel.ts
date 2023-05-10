import { SubGrupsModel } from './SubGrupsModel';

export interface GroupModel {
  id: number;
  name: string;
  subgrupe: [SubGrupsModel];
}
