import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoomRoutingModule } from './add-room-routing.module';
import { AddRoomComponent } from './add-room.component';


@NgModule({
  declarations: [
    AddRoomComponent
  ],
  imports: [
    CommonModule,
    AddRoomRoutingModule
  ]
})
export class AddRoomModule { }
