import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriiComponent } from './materii.component';
import { MateriiDetailsComponent } from './materii-details/materii-details.component';

const routes: Routes = [
  { path: '', component: MateriiComponent },
  {
    path: 'details/:id',
    component: MateriiDetailsComponent,
  },
  {
    path: 'update/:id',
    component: MateriiDetailsComponent,
  },
  {
    path: 'create',
    component: MateriiDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriiRoutingModule {}
