import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriiRoutingModule } from './materii-routing.module';
import { MateriiComponent } from './materii.component';
import { MateriiDetailsComponent } from './materii-details/materii-details.component';


@NgModule({
  declarations: [
    MateriiComponent,
    MateriiDetailsComponent
  ],
  imports: [
    CommonModule,
    MateriiRoutingModule
  ]
})
export class MateriiModule { }
