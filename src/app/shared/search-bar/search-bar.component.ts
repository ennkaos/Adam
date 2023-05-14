import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Input() data2: any[];
  @Input() key: string;
  @Output() eventEmitter = new EventEmitter<any>();

  filterBy: string = '';
  sorting() {
    if (this.filterBy.length >= 1) {
      const regex = new RegExp(`.*${this.filterBy}.*`, 'i');

      this.eventEmitter.emit(this.data2.filter((a) => regex.test(a[this.key])));
    } else {
      this.eventEmitter.emit(false);
    }
  }
}
