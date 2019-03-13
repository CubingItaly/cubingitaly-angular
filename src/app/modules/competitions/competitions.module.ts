import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficialComponent } from './official/official.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { routes } from './competition-routing.module';
import { CompetitionComponent } from './competition/competition.component';
import { MatTabsModule, MatExpansionModule, MatButtonModule, MatListModule } from '@angular/material';
import { GeneralComponent } from './general/general.component';
import { CompDatePipe } from './comp-date.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { DirectionsComponent } from './directions/directions.component';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDayPipe } from './schedule-day.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MobileRowComponent } from './mobile-row/mobile-row.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MobileRowOfficialComponent } from './mobile-row-official/mobile-row-official.component';

@NgModule({
  declarations: [OfficialComponent, CompetitionComponent, GeneralComponent, CompDatePipe, RegistrationComponent, DirectionsComponent, ScheduleComponent, ScheduleDayPipe, MobileRowComponent, MobileRowOfficialComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatTabsModule,
    HtmlViewerModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatButtonModule,
    MatListModule
  ]
})
export class CompetitionsModule { }
