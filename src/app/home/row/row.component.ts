import { Component, Input } from '@angular/core';
import { AppointmentModel } from 'src/app/models/AppointmentModel';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent {
  @Input() item: any = [];
  @Input() groupsLength!: number;
  indexAr: number[] = [];
  ngOnInit(): void {
    console.log(this.item);
  }
  getClassOfNg(item: AppointmentModel): String {
    if (item && item.groups === true && item.IsLab === false) {
      return 'LabGroups';
    } else if (item && item.groups === true && item.IsLab === true) {
      return 'LabGroupsTogheter';
    } else if (item && item.groups === false && item.IsLab === true) {
      return 'LabNotTogheter';
    } else {
      return 'cellNothing';
    }
  }
}
