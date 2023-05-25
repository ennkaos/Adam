import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, of } from 'rxjs';

import { MateriiModel } from 'src/app/models/MateriiModel';
import { MateriiService } from '../services/materii.service';

@Component({
  selector: 'app-materii-details',
  templateUrl: './materii-details.component.html',
  styleUrls: ['./materii-details.component.css'],
})
export class MateriiDetailsComponent {
  materii$: Observable<MateriiModel> = new Observable<MateriiModel>();
  router!: string | undefined;
  editable!: boolean;
  profileForm!: FormGroup;
  materiiResult!: MateriiModel;
  materiiId!: null | string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private materiiService: MateriiService,
    private toastr: ToastrService,
    private router2: Router
  ) {}

  ngOnInit(): void {
    this.router = this.route.snapshot.url.shift()?.path;
    this.materiiId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;

    this.profileForm =
      this.router === 'create'
        ? this.fb.group({
            name: ['', Validators.required],
            anMaterie: [1, Validators.required],
          })
        : this.fb.group({
            id: [0],
            name: ['', Validators.required],
            anMaterie: [1, Validators.required],
          });

    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
    } else {
      this.editable = true;
    }
    if (this.materiiId !== null) {
      this.materii$ = this.materiiService.getMaterie(Number(this.materiiId))
        ? this.materiiService.getMaterie(Number(this.materiiId))
        : EMPTY;

      this.materii$.subscribe((e) => {
        this.materiiResult = e;

        this.profileForm.controls['id'].setValue(this.materiiId);
        this.profileForm.controls['name'].setValue(this.materiiResult.name);
        this.profileForm.controls['anMaterie'].setValue(
          this.materiiResult.anMaterie
        );
      });
    } else {
      this.materii$ = of({ id: 1, name: '', anMaterie: 1 });
      this.materii$.subscribe();
    }
  }

  onSubmit() {
    if (this.router === 'update') {
      if (
        !this.profileForm.controls['name'].errors &&
        !this.profileForm.controls['anMaterie'].errors
      ) {
        if (!this.materiiId) this.toastr.warning('Nu exista Id-ul salii');
        if (
          this.profileForm.controls['name'].dirty ||
          this.profileForm.controls['anMaterie'].dirty
        ) {
          if (
            this.profileForm.controls['anMaterie'].value <= 4 &&
            this.profileForm.controls['anMaterie'].value > 0
          ) {
            this.materiiService.update(
              Number(this.materiiId),
              this.profileForm.value
            );
            this.router2.navigate(['materii']);
          } else {
            this.toastr.warning('Anul trebuie sa fie intre 1 si 4');
          }
        } else {
          this.toastr.warning('Modifica o proprietate inainte de a salva !');
        }
      } else {
        this.toastr.warning('Pentru a face update trebuie sa modici datele!');
      }
    } else {
      if (
        !this.profileForm.controls['name'].errors &&
        !this.profileForm.controls['anMaterie'].errors
      ) {
        if (
          this.profileForm.controls['anMaterie'].value <= 4 &&
          this.profileForm.controls['anMaterie'].value > 0
        ) {
          this.materiiService.create(this.profileForm.value);
          this.router2.navigate(['materii']);
        } else {
          this.toastr.warning('Modifica o proprietate inainte de a salva !');
        }
      } else {
        this.toastr.warning(
          'Pentru a creea o sala trebuie sa introduci toate datele!'
        );
      }
    }
  }

  onReset() {
    console.log(this.profileForm.touched, this.router);
    if (this.profileForm.touched) {
      if (this.router === 'create') {
        this.profileForm.controls['name'].setValue('');
        this.profileForm.controls['anMaterie'].setValue(1);

        this.toastr.success('Resetat cu success');
      } else if (this.router === 'update') {
        this.profileForm.controls['name'].setValue(this.materiiResult.name);
        this.profileForm.controls['anMaterie'].setValue(
          this.materiiResult.anMaterie
        );

        this.toastr.success('Resetat cu success');
      }
    } else {
      this.toastr.error('Nu ai modificat nimic');
    }
  }
}
