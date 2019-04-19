import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeWidgetComponent } from './organize-widget.component';

describe('OrganizeWidgetComponent', () => {
  let component: OrganizeWidgetComponent;
  let fixture: ComponentFixture<OrganizeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
