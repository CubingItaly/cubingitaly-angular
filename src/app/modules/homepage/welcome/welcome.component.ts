import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { SliderService } from '../services/slider.service';

@Component({
  selector: 'welcome-widget',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnDestroy {
  banners: string[];
  watcher: Subscription;
  bp = {
    "(max-width: 599.99px)": "xs",
    "(min-width: 600px) and (max-width: 959.99px)": "sm",
    "(min-width: 960px) and (max-width: 1279.99px)": "md",
    "(min-width: 1280px) and (max-width: 1919.99px)": "lg",
    "(min-width: 1920px)": "xl"
  }

  constructor(private bpObserver: BreakpointObserver, private http: HttpClient, private sliderSVC: SliderService) {
    this.watcher = bpObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(async (res) => {
      this.banners = await sliderSVC.images(this.getSize(res.breakpoints)).toPromise();
    });
  }

  private getSize(breakpoints) {
    for (let k in this.bp) {
      if (breakpoints[k])
        return this.bp[k];
    }
  };

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

}
