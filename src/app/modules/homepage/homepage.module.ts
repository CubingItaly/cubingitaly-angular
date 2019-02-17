import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { WelcomeComponent } from './welcome/welcome.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { ArticleModule } from '../article/article.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SliderService } from './services/slider.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SlideshowModule,
    ArticleModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [HomepageComponent, WelcomeComponent, CompetitionsComponent],
  providers: [SliderService],
  exports: [HomepageComponent]
})
export class HomepageModule { }
