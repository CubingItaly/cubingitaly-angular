import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDirectionsComponent } from './edit-directions.component';

describe('EditDirectionsComponent', () => {
  let component: EditDirectionsComponent;
  let fixture: ComponentFixture<EditDirectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDirectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
