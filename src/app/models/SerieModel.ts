import { GroupModel } from './GroupModel';

export interface SerieModel {
  id: number;
  name: string;
  grupe: [GroupModel];
}
