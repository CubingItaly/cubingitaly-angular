import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopOfficialTableComponent } from './desktop-official-table.component';

describe('DesktopOfficialTableComponent', () => {
  let component: DesktopOfficialTableComponent;
  let fixture: ComponentFixture<DesktopOfficialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopOfficialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopOfficialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
