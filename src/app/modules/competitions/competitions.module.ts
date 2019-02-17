import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate/candidate.component';
import { PageModule } from '../page/page.module';
import { RouterModule } from '@angular/router';
import { routes } from './competitions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompetitionComponent } from './competition/competition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatTabsModule } from '@angular/material';
import { GeneralComponent } from './general/general.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompDatePipe } from './comp-date.pipe';

@NgModule({
  declarations: [CandidateComponent, CompetitionComponent, GeneralComponent, RegistrationComponent, CompDatePipe],
  imports: [
    PageModule,
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
  ]
})
export class CompetitionsModule { }
