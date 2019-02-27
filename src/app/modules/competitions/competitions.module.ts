import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateComponent } from './candidate/candidate.component';
import { PageModule } from '../page/page.module';
import { RouterModule } from '@angular/router';
import { routes } from './competitions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompetitionComponent } from './competition/competition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatTabsModule, MatTableModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatAutocompleteModule, MatCheckboxModule, MatListModule, MatSelectModule } from '@angular/material';
import { CompDatePipe } from './comp-date.pipe';
import { EditComponent } from './edit/edit.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CompetitionService } from './services/competition.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewComponent } from './new/new.component';
import { EditGeneralComponent } from './edit-general/edit-general.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { EditDirectionsComponent } from './edit-directions/edit-directions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditScheduleComponent } from './edit-schedule/edit-schedule.component';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';
import { OfficialComponent } from './official/official.component';
import { ScheduleViewerComponent } from './schedule-viewer/schedule-viewer.component';
import { RegistrationComponent } from './registration/registration.component';
import { GeneralComponent } from './general/general.component';
import { DirectionsComponent } from './directions/directions.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [CandidateComponent, CompetitionComponent,
    CompDatePipe, EditComponent, NewComponent, EditGeneralComponent,
    EditRegistrationComponent, EditDirectionsComponent, EditScheduleComponent, OfficialComponent, ScheduleViewerComponent, RegistrationComponent, GeneralComponent, DirectionsComponent, ScheduleComponent],
  imports: [
    PageModule,
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    CKEditorModule,
    HtmlViewerModule,
    MatListModule
  ],
  providers: [CompetitionService]
})
export class CompetitionsModule { }
