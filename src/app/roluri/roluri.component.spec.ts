import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoluriComponent } from './roluri.component';

describe('RoluriComponent', () => {
  let component: RoluriComponent;
  let fixture: ComponentFixture<RoluriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoluriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoluriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
