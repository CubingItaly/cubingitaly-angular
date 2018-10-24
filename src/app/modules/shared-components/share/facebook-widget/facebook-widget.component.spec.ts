import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookWidgetComponent } from './facebook-widget.component';

describe('FacebookWidgetComponent', () => {
  let component: FacebookWidgetComponent;
  let fixture: ComponentFixture<FacebookWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
