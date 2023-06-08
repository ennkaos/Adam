import { Pipe, PipeTransform } from '@angular/core';
import { Parity } from 'src/app/models/AppointmentModel';

@Pipe({
  name: 'parity',
})
export class ParityPipe implements PipeTransform {
  transform(value: any): string {
    switch (value) {
      case 0:
        return 'Saptamana Para';
      case 1:
        return 'Saptamana Impara';
      case 2:
        return 'Ambele Septamani';
    }
    return '';
  }
}
