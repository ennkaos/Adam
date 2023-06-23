import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrarRoutingModule } from './orar-routing.module';
import { OrarComponent } from './orar.component';
import { RowComponent } from '../home/row/row.component';
import { CellComponent } from '../home/cell/cell.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [OrarComponent],
  imports: [CommonModule, OrarRoutingModule, SharedModule],
})
export class OrarModule {}
