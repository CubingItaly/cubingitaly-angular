import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRowOfficialComponent } from './mobile-row-official.component';

describe('MobileRowOfficialComponent', () => {
  let component: MobileRowOfficialComponent;
  let fixture: ComponentFixture<MobileRowOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRowOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRowOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
