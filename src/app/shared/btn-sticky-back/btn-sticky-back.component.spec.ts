import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnStickyBackComponent } from './btn-sticky-back.component';

describe('BtnStickyBackComponent', () => {
  let component: BtnStickyBackComponent;
  let fixture: ComponentFixture<BtnStickyBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnStickyBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnStickyBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
