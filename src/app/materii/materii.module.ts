import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriiRoutingModule } from './materii-routing.module';
import { MateriiComponent } from './materii.component';
import { MateriiDetailsComponent } from './materii-details/materii-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [MateriiComponent, MateriiDetailsComponent],
  imports: [
    CommonModule,
    MateriiRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class MateriiModule {}
