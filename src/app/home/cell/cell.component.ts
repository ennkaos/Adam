import { Component, Input } from '@angular/core';
import { AppointmentModel, Parity } from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() item!: AppointmentModel;

  ngOnInit(): void {}
  isOdd(parity: Parity): string {
    if (parity === Parity.odd) {
      return 'bg-success';
    } else if (parity === Parity.even) {
      return 'bg-danger';
    } else {
      return 'bg-primary';
    }
  }
  isTextOdd(parity: Parity): string {
    if (parity === Parity.odd) {
      return 'Saptamana Impara';
    } else if (parity === Parity.even) {
      return 'Saptamana Par';
    } else {
      return 'Saptamana Comuna';
    }
  }
}
