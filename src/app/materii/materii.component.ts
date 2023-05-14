import { Component } from '@angular/core';
import { MateriiService } from './services/materii.service';
import { ToastrService } from 'ngx-toastr';
import { MateriiModel } from '../models/MateriiModel';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-materii',
  templateUrl: './materii.component.html',
  styleUrls: ['./materii.component.css'],
})
export class MateriiComponent {
  materii$!: Observable<MateriiModel[]>;
  materiiResult!: MateriiModel[];
  subscriptionMaterii!: Subscription;
  initialData: MateriiModel[];

  constructor(public materiiService: MateriiService) {}

  ngOnInit(): void {
    this.materii$ = this.materiiService.get();
    this.subscriptionMaterii = this.materii$.subscribe((e) => {
      console.log('Subscription Started ...');

      this.materiiResult = e;
      this.initialData = e;
    });
  }
  filter($event) {
    if ($event) {
      this.materiiResult = $event;
    } else {
      this.materiiResult = this.initialData;
    }
  }
  sort($event) {
    this.materiiResult = $event;
  }
  delete(id: number | undefined): void {
    if (id) this.materiiService.delete(id);
    this.materiiResult = this.materiiResult.filter((e) => e.id !== id);
    this.initialData = this.initialData.filter((e) => e.id !== id);
  }
}
