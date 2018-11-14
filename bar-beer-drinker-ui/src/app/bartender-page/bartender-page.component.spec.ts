import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BartenderPageComponent } from './bartender-page.component';

describe('BartenderPageComponent', () => {
  let component: BartenderPageComponent;
  let fixture: ComponentFixture<BartenderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BartenderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BartenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
