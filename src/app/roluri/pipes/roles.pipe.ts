import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles',
})
export class RolesPipe implements PipeTransform {
  transform(value: number): string {
    let role = '';
    if (value === 0) {
      role = 'Admin';
    } else if (value === 1) {
      role = 'Profesor';
    } else if (value === 2) {
      role = 'Student';
    }
    return role;
  }
}
