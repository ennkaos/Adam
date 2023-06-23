import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriiDetailsComponent } from './serii-details.component';

describe('SeriiDetailsComponent', () => {
  let component: SeriiDetailsComponent;
  let fixture: ComponentFixture<SeriiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriiDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
