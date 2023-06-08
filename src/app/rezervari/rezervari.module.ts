import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RezervariRoutingModule } from './rezervari-routing.module';
import { RezervariComponent } from './rezervari.component';
import { RezervariDetailsComponent } from './rezervari-details/rezervari-details.component';
import { SharedModule } from '../shared/shared/shared.module';
import { DayPipe } from './pipes/day.pipe';
import { StartingTimeSlotPipe } from './pipes/starting-time-slot.pipe';
import { ParityPipe } from './pipes/parity.pipe';
import { IsLabPipe } from './pipes/is-lab.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RezervariComponent,
    RezervariDetailsComponent,
    DayPipe,
    StartingTimeSlotPipe,
    ParityPipe,
    IsLabPipe,
  ],
  imports: [
    CommonModule,
    RezervariRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RezervariModule {}
