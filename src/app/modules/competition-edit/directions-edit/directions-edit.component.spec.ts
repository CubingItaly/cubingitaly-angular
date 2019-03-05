import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionsEditComponent } from './directions-edit.component';

describe('DirectionsEditComponent', () => {
  let component: DirectionsEditComponent;
  let fixture: ComponentFixture<DirectionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
