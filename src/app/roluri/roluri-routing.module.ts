import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoluriComponent } from './roluri.component';

const routes: Routes = [{ path: '', component: RoluriComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoluriRoutingModule { }
