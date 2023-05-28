import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';

const routes: Routes = [
  { path: '', component: RequestsComponent },
  { path: 'details/:id', component: RequestDetailsComponent },
  { path: 'create', component: RequestDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
