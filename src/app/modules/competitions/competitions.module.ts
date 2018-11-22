import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate/candidate.component';
import { PageModule } from '../page/page.module';
import { RouterModule } from '@angular/router';
import { routes } from './competitions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CandidateComponent],
  imports: [
    PageModule,
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule
  ]
})
export class CompetitionsModule { }
