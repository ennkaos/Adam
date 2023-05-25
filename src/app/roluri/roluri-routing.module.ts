import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoluriComponent } from './roluri.component';
import { RoluriDetailsComponent } from './roluri-details/roluri-details.component';

const routes: Routes = [
  { path: '', component: RoluriComponent },
  {
    path: 'details/:id',
    component: RoluriDetailsComponent,
  },
  {
    path: 'details/:id',
    component: RoluriDetailsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoluriRoutingModule {}
