import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoluriRoutingModule } from './roluri-routing.module';
import { RoluriComponent } from './roluri.component';
import { SharedModule } from '../shared/shared/shared.module';
import { RoluriDetailsComponent } from './roluri-details/roluri-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RolesPipe } from './pipes/roles.pipe';

@NgModule({
  declarations: [RoluriComponent, RoluriDetailsComponent, RolesPipe],
  imports: [
    CommonModule,
    RoluriRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RoluriModule {}
