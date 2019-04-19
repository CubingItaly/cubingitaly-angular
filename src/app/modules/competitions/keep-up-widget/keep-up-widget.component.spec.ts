import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepUpWidgetComponent } from './keep-up-widget.component';

describe('KeepUpWidgetComponent', () => {
  let component: KeepUpWidgetComponent;
  let fixture: ComponentFixture<KeepUpWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeepUpWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepUpWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
