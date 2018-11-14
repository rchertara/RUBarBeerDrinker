import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPageComponent } from './modification-page.component';

describe('ModificationPageComponent', () => {
  let component: ModificationPageComponent;
  let fixture: ComponentFixture<ModificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
