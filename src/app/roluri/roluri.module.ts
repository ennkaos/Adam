import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoluriRoutingModule } from './roluri-routing.module';
import { RoluriComponent } from './roluri.component';
import { SharedModule } from '../shared/shared/shared.module';
import { RoluriDetailsComponent } from './roluri-details/roluri-details.component';

@NgModule({
  declarations: [RoluriComponent, RoluriDetailsComponent],
  imports: [CommonModule, RoluriRoutingModule, SharedModule],
})
export class RoluriModule {}
