import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [RequestsComponent],
  imports: [CommonModule, RequestsRoutingModule, SharedModule],
})
export class RequestsModule {}
