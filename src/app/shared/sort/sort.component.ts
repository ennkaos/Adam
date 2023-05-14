import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent {
  @Input() data: any[];
  @Input() key: string;
  @Output() eventEmitter = new EventEmitter<any[]>();
  localData: any[];
  direction: boolean = false;

  sorting(): any {
    this.localData = this.data.slice();
    this.direction
      ? this.localData.sort((a, b) =>
          a[this.key] < b[this.key] ? -1 : a[this.key] > b[this.key] ? 1 : 0
        )
      : this.localData.sort((a, b) =>
          a[this.key] > b[this.key] ? -1 : a[this.key] < b[this.key] ? 1 : 0
        );
    this.eventEmitter.emit(this.localData);
    this.direction = !this.direction;
  }
}
