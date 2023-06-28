import { Pipe, PipeTransform } from '@angular/core';
import { Parity } from 'src/app/models/AppointmentModel';

@Pipe({
  name: 'parity',
})
export class ParityPipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case 0:
        return 'Saptamana Impara';
      case 1:
        return 'Saptamana Para';
      case 2:
        return 'In fiecare saptamana';
    }
    return '';
  }
}
