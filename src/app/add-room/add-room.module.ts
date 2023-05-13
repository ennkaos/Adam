import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomRoutingModule } from './add-room-routing.module';
import { AddRoomComponent } from './add-room.component';
import { RoomsDetailsComponent } from './rooms-details/rooms-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [AddRoomComponent, RoomsDetailsComponent],
  imports: [
    CommonModule,
    AddRoomRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AddRoomModule {}
