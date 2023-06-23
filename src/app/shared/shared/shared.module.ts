import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnStickyBackComponent } from '../btn-sticky-back/btn-sticky-back.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SortComponent } from '../sort/sort.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { CellComponent } from 'src/app/home/cell/cell.component';
import { RowComponent } from 'src/app/home/row/row.component';

@NgModule({
  declarations: [
    BtnStickyBackComponent,
    SpinnerComponent,
    SortComponent,
    SearchBarComponent,
    CellComponent,
    RowComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    BtnStickyBackComponent,
    SpinnerComponent,
    SortComponent,
    SearchBarComponent,
    CellComponent,
    RowComponent,
  ],
})
export class SharedModule {}
