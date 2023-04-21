import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CellComponent } from './cell/cell.component';
import { RowComponent } from './row/row.component';

@NgModule({
  declarations: [HomeComponent, CellComponent, RowComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
