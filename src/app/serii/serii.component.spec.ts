import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriiComponent } from './serii.component';

describe('SeriiComponent', () => {
  let component: SeriiComponent;
  let fixture: ComponentFixture<SeriiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
