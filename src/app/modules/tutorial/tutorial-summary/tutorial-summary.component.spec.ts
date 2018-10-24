import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSummaryComponent } from './tutorial-summary.component';

describe('TutorialSummaryComponent', () => {
  let component: TutorialSummaryComponent;
  let fixture: ComponentFixture<TutorialSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
