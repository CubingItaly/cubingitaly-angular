import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMobileRowComponent } from './my-mobile-row.component';

describe('MyMobileRowComponent', () => {
  let component: MyMobileRowComponent;
  let fixture: ComponentFixture<MyMobileRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMobileRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMobileRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
