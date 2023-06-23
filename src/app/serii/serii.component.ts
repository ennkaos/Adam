import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SeriiModel } from '../models/SeriiModel';
import { SeriiService } from './services/serii.service';

@Component({
  selector: 'app-serii',
  templateUrl: './serii.component.html',
  styleUrls: ['./serii.component.css'],
})
export class SeriiComponent {
  serii$!: Observable<SeriiModel[]>;
  seriiResult!: SeriiModel[];
  subscriptionMaterii!: Subscription;
  initialData: SeriiModel[];

  constructor(public seriiService: SeriiService) {}
  ngOnInit(): void {
    this.serii$ = this.seriiService.get();
    this.subscriptionMaterii = this.serii$.subscribe((e) => {
      console.log('Subscription Started ...');

      this.seriiResult = e;
      this.initialData = e;
    });
  }
  filter($event) {
    if ($event) {
      this.seriiResult = $event;
    } else {
      this.seriiResult = this.initialData;
    }
  }
  sort($event) {
    this.seriiResult = $event;
  }
  delete(id: number | undefined): void {
    if (id) this.seriiService.delete(id);
    this.seriiResult = this.seriiResult.filter((e) => e.id !== id);
    this.initialData = this.initialData.filter((e) => e.id !== id);
  }
}
