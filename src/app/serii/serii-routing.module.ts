import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriiComponent } from './serii.component';
import { LoginGuard } from '../login.guard';
import { SeriiDetailsComponent } from './serii-details/serii-details.component';

const routes: Routes = [
  {
    path: '',
    component: SeriiComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'details/:id',
    component: SeriiDetailsComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'update/:id',
    component: SeriiDetailsComponent,
    canActivate: [LoginGuard],
    data: {
      expectedRole: [0],
    },
  },
  {
    path: 'create',
    component: SeriiDetailsComponent,
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
export class SeriiRoutingModule {}
