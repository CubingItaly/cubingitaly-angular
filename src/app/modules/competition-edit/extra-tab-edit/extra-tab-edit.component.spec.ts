import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraTabEditComponent } from './extra-tab-edit.component';

describe('ExtraTabEditComponent', () => {
  let component: ExtraTabEditComponent;
  let fixture: ComponentFixture<ExtraTabEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraTabEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraTabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
