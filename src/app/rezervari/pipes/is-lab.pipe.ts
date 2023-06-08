import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isLab',
})
export class IsLabPipe implements PipeTransform {
  transform(value: unknown): string {
    return value ? 'Laborator' : 'Curs';
  }
}
