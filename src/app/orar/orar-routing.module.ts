import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrarComponent } from './orar.component';

const routes: Routes = [{ path: '', component: OrarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrarRoutingModule { }
