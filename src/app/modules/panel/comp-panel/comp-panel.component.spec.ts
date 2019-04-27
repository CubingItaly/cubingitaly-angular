import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompPanelComponent } from './comp-panel.component';

describe('CompPanelComponent', () => {
  let component: CompPanelComponent;
  let fixture: ComponentFixture<CompPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
