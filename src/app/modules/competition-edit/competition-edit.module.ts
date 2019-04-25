import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { routes } from './competition-edit-routing.module';
import { MatTabsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatListModule, MatChipsModule, MatAutocompleteModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule, MatTableModule, MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralEditComponent } from './general-edit/general-edit.component';
import { RegistrationEditComponent } from './registration-edit/registration-edit.component';
import { DirectionsEditComponent } from './directions-edit/directions-edit.component';
import { ScheduleEditComponent } from './schedule-edit/schedule-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ManageCompetitionComponent } from './manage-competition/manage-competition.component';
import { CompetitionEditService } from './services/competition-edit.service';
import { CompEditGuardService } from './services/comp-edit-guard.service';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ExtraTabEditComponent } from './extra-tab-edit/extra-tab-edit.component';

@NgModule({
  declarations: [EditComponent, NewComponent, GeneralEditComponent, RegistrationEditComponent, DirectionsEditComponent, ScheduleEditComponent, ManageCompetitionComponent, ExtraTabEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatTabsModule,
    CKEditorModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    SharedComponentsModule
  ],
  providers: [CompetitionEditService, CompEditGuardService]
})
export class CompetitionEditModule { }
