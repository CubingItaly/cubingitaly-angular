import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVIewerComponent } from './category-viewer.component';

describe('CategoryVIewerComponent', () => {
  let component: CategoryVIewerComponent;
  let fixture: ComponentFixture<CategoryVIewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryVIewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryVIewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
