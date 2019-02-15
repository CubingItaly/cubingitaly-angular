import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQuickActionsComponent } from './faq-quick-actions.component';

describe('FaqQuickActionsComponent', () => {
  let component: FaqQuickActionsComponent;
  let fixture: ComponentFixture<FaqQuickActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqQuickActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
