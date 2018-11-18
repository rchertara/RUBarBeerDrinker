import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderDetailsComponent } from './bartender-details.component';

describe('BartenderDetailsComponent', () => {
  let component: BartenderDetailsComponent;
  let fixture: ComponentFixture<BartenderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartenderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
