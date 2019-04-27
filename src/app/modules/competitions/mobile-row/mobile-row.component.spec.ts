import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRowComponent } from './mobile-row.component';

describe('MobileRowComponent', () => {
  let component: MobileRowComponent;
  let fixture: ComponentFixture<MobileRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
