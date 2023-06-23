import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriiRoutingModule } from './serii-routing.module';
import { SeriiComponent } from './serii.component';
import { SharedModule } from '../shared/shared/shared.module';
import { SeriiDetailsComponent } from './serii-details/serii-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SeriiComponent, SeriiDetailsComponent],
  imports: [
    CommonModule,
    SeriiRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SeriiModule {}
