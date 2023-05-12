import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriiComponent } from './materii.component';

describe('MateriiComponent', () => {
  let component: MateriiComponent;
  let fixture: ComponentFixture<MateriiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
