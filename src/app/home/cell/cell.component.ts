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
  isOdd(parity: number): string {
    if (parity === 0) {
      return 'bg-success';
    } else if (parity === 1) {
      return 'bg-danger';
    } else {
      return 'bg-primary';
    }
  }
  isTextOdd(parity: number): string {
    if (parity === 0) {
      return 'Saptamana Impara';
    } else if (parity === 1) {
      return 'Saptamana Para';
    } else {
      return 'In fiecare saptamana';
    }
  }
}
