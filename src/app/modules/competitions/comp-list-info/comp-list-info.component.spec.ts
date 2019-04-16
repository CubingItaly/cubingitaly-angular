import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListInfoComponent } from './comp-list-info.component';

describe('CompListInfoComponent', () => {
  let component: CompListInfoComponent;
  let fixture: ComponentFixture<CompListInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompListInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
