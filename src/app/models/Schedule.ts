import { SerieModel } from './SerieModel';

export interface Schedule {
  id: string;
  nume: string;
  Serie: [SerieModel];
}
