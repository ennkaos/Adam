import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervariDetailsComponent } from './rezervari-details.component';

describe('RezervariDetailsComponent', () => {
  let component: RezervariDetailsComponent;
  let fixture: ComponentFixture<RezervariDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezervariDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervariDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
