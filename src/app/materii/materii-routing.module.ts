import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriiComponent } from './materii.component';

const routes: Routes = [{ path: '', component: MateriiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriiRoutingModule { }
