import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
})
export class RowComponent {
  @Input() item: any = [];
  indexAr: number[] = [];
  ngOnInit(): void {
    console.log(this.item);
  }
}
