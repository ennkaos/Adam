import { GroupModel } from './GroupModel';

export interface SerieModel {
  id: number;
  name: string;
  groups: [GroupModel];
}
