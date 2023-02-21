import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoluriRoutingModule } from './roluri-routing.module';
import { RoluriComponent } from './roluri.component';


@NgModule({
  declarations: [
    RoluriComponent
  ],
  imports: [
    CommonModule,
    RoluriRoutingModule
  ]
})
export class RoluriModule { }
