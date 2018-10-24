import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorQuickActionsComponent } from './editor-quick-actions.component';

describe('EditorQuickActionsComponent', () => {
  let component: EditorQuickActionsComponent;
  let fixture: ComponentFixture<EditorQuickActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorQuickActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
