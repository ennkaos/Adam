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
  constructor(
    public materiiService: MateriiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.materii$ = this.materiiService.get();
    this.subscriptionMaterii = this.materii$.subscribe((e) => {
      console.log('Subscription Started ...');

      this.materiiResult = e;
    });
  }
  delete(id: number | undefined): void {
    if (id) this.materiiService.delete(id);

    this.materiiResult = this.materiiResult.filter((e) => e.id !== id);
    //this.ngOnInit();
    //window.location.reload();
  }
}
