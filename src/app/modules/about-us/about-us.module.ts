import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamModule } from '../team/team.module';
import { PageModule } from '../page/page.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TeamModule,
    PageModule
  ],
  declarations: [AboutUsComponent],
  exports: [AboutUsComponent]
})
export class AboutUsModule { }
