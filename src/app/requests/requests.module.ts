import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { SharedModule } from '../shared/shared/shared.module';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestsComponent, RequestDetailsComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RequestsModule {}
