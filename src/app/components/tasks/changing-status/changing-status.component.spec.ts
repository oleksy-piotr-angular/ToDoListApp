import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangingStatusComponent } from './changing-status.component';

describe('ChangingStatusComponent', () => {
  let component: ChangingStatusComponent;
  let fixture: ComponentFixture<ChangingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangingStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
