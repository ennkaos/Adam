import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnStickyBackComponent } from '../btn-sticky-back/btn-sticky-back.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SortComponent } from '../sort/sort.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BtnStickyBackComponent,
    SpinnerComponent,
    SortComponent,
    SearchBarComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    BtnStickyBackComponent,
    SpinnerComponent,
    SortComponent,
    SearchBarComponent,
  ],
})
export class SharedModule {}
