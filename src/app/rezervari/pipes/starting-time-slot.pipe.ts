import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startingTimeSlot',
})
export class StartingTimeSlotPipe implements PipeTransform {
  transform(value: unknown): string {
    switch (value) {
      case 0:
        return '8:00';
      case 1:
        return '9:00';
      case 2:
        return '10:00';
      case 3:
        return '11:00';
      case 4:
        return '12:00';
      case 5:
        return '13:00';
      case 6:
        return '14:00';
      case 7:
        return '15:00';
      case 8:
        return '16:00';
      case 9:
        return '17:00';
      case 10:
        return '18:00';
      case 11:
        return '19:00';

      default:
        break;
    }
    return null;
  }
}
