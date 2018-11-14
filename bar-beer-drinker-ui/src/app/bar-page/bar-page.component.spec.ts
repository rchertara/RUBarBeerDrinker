import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarPageComponent } from './bar-page.component';

describe('BarPageComponent', () => {
  let component: BarPageComponent;
  let fixture: ComponentFixture<BarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
