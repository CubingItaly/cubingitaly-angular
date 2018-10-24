import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeWidgetComponent } from './youtube-widget.component';

describe('YoutubeWidgetComponent', () => {
  let component: YoutubeWidgetComponent;
  let fixture: ComponentFixture<YoutubeWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
