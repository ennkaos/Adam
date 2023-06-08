import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: unknown): string {
    switch (value) {
      case 0:
        return 'Luni';

      case 1:
        return 'Marti';

      case 2:
        return 'Miercuri';

      case 3:
        return 'Joi';

      case 4:
        return 'Vineri';
    }
    return null;
  }
}
