import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriiDetailsComponent } from './materii-details.component';

describe('MateriiDetailsComponent', () => {
  let component: MateriiDetailsComponent;
  let fixture: ComponentFixture<MateriiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
