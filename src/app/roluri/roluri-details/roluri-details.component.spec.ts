import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoluriDetailsComponent } from './roluri-details.component';

describe('RoluriDetailsComponent', () => {
  let component: RoluriDetailsComponent;
  let fixture: ComponentFixture<RoluriDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoluriDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoluriDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
