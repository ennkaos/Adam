import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnStickyBackComponent } from '../btn-sticky-back/btn-sticky-back.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  declarations: [BtnStickyBackComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [BtnStickyBackComponent, SpinnerComponent],
})
export class SharedModule {}
