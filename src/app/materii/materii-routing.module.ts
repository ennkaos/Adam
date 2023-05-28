import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriiComponent } from './materii.component';
import { MateriiDetailsComponent } from './materii-details/materii-details.component';
import { LoginGuard } from '../login.guard';

const routes: Routes = [
  {
    path: '',
    component: MateriiComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'details/:id',
    component: MateriiDetailsComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'update/:id',
    component: MateriiDetailsComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'create',
    component: MateriiDetailsComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriiRoutingModule {}
