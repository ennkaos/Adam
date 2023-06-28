import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { MateriiModel } from 'src/app/models/MateriiModel';
import { SeriiModel } from 'src/app/models/SeriiModel';
import { SeriiService } from '../services/serii.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serii-details',
  templateUrl: './serii-details.component.html',
  styleUrls: ['./serii-details.component.css'],
})
export class SeriiDetailsComponent {
  serii$: Observable<SeriiModel> = new Observable<SeriiModel>();
  router!: string | undefined;
  editable!: boolean;
  profileForm!: FormGroup;
  seriiResult!: SeriiModel;
  seriiId!: null | string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private seriiService: SeriiService,
    private toastr: ToastrService,
    private router2: Router
  ) {}
  ngOnInit(): void {
    this.router = this.route.snapshot.url.shift()?.path;
    this.seriiId = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : null;
    this.profileForm =
      this.router === 'create'
        ? this.fb.group({
            name: ['', Validators.required],
            anStudiu: [1, Validators.required],
            nrStudenti: [1, Validators.required],
          })
        : this.fb.group({
            id: [0],
            name: ['', Validators.required],
            anStudiu: [1, Validators.required],
            nrStudenti: [1, Validators.required],
          });
    if (this.router === 'details') {
      this.profileForm.disable();
      this.editable = false;
    } else {
      this.editable = true;
    }
    if (this.seriiId !== null) {
      this.serii$ = this.seriiService.getMaterie(Number(this.seriiId))
        ? this.seriiService.getMaterie(Number(this.seriiId))
        : EMPTY;
      this.serii$.subscribe((e) => {
        this.seriiResult = e;

        this.profileForm.controls['id'].setValue(this.seriiId);
        this.profileForm.controls['name'].setValue(this.seriiResult.name);
        this.profileForm.controls['anStudiu'].setValue(
          this.seriiResult.anStudiu
        );
        this.profileForm.controls['nrStudenti'].setValue(
          this.seriiResult.nrStudenti
        );
      });
    } else {
      this.serii$ = of({ id: 1, name: '', anStudiu: 1, nrStudenti: 1 });
      this.serii$.subscribe();
    }
  }
  onSubmit() {
    if (this.router === 'update') {
      if (
        !this.profileForm.controls['name'].errors &&
        !this.profileForm.controls['anStudiu'].errors
      ) {
        if (!this.seriiId) this.toastr.warning('Nu exista Id-ul seriei!');
        if (
          this.profileForm.controls['name'].dirty ||
          this.profileForm.controls['anStudiu'].dirty ||
          this.profileForm.controls['nrStudenti'].dirty
        ) {
          if (
            this.profileForm.controls['anStudiu'].value <= 4 &&
            this.profileForm.controls['anStudiu'].value > 0
          ) {
            this.seriiService.update(
              Number(this.seriiId),
              this.profileForm.value
            );
            this.router2.navigate(['serii']);
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
        !this.profileForm.controls['anStudiu'].errors
      ) {
        if (
          this.profileForm.controls['anStudiu'].value <= 4 &&
          this.profileForm.controls['anStudiu'].value > 0
        ) {
          this.seriiService.create(this.profileForm.value);
          this.router2.navigate(['serii']);
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
        this.profileForm.controls['anStudiu'].setValue(1);
        this.profileForm.controls['nrStudenti'].setValue(1);
        this.toastr.success('Resetat cu success');
      } else if (this.router === 'update') {
        this.profileForm.controls['name'].setValue(this.seriiResult.name);
        this.profileForm.controls['anStudiu'].setValue(
          this.seriiResult.anStudiu
        );
        this.profileForm.controls['nrStudenti'].setValue(
          this.seriiResult.nrStudenti
        );

        this.toastr.success('Resetat cu success');
      }
    } else {
      this.toastr.error('Nu ai modificat nimic');
    }
  }
}
