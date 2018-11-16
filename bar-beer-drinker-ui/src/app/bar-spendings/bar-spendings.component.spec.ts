import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSpendingsComponent } from './bar-spendings.component';

describe('BarSpendingsComponent', () => {
  let component: BarSpendingsComponent;
  let fixture: ComponentFixture<BarSpendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarSpendingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
