import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDesktopTableComponent } from './my-desktop-table.component';

describe('MyDesktopTableComponent', () => {
  let component: MyDesktopTableComponent;
  let fixture: ComponentFixture<MyDesktopTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDesktopTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDesktopTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
