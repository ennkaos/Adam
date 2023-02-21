import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RezervariRoutingModule } from './rezervari-routing.module';
import { RezervariComponent } from './rezervari.component';


@NgModule({
  declarations: [
    RezervariComponent
  ],
  imports: [
    CommonModule,
    RezervariRoutingModule
  ]
})
export class RezervariModule { }
