import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficialComponent } from './official/official.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { routes } from './competition-routing.module';
import { CompetitionComponent } from './competition/competition.component';
import { MatTabsModule, MatExpansionModule, MatButtonModule, MatListModule, MatCardModule } from '@angular/material';
import { GeneralComponent } from './general/general.component';
import { CompDatePipe } from './pipes/comp-date.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { DirectionsComponent } from './directions/directions.component';
import { HtmlViewerModule } from '../html-viewer/html-viewer.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDayPipe } from './schedule-day.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MobileRowComponent } from './mobile-row/mobile-row.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MobileRowOfficialComponent } from './mobile-row-official/mobile-row-official.component';
import { DesktopOfficialTableComponent } from './desktop-official-table/desktop-official-table.component';
import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
import { MyDesktopTableComponent } from './my-desktop-table/my-desktop-table.component';
import { CompDaysPipe } from './pipes/comp-days.pipe';
import { MyMobileRowComponent } from './my-mobile-row/my-mobile-row.component';
import { PageModule } from '../page/page.module';
import { OrganizeWidgetComponent } from './organize-widget/organize-widget.component';
import { KeepUpWidgetComponent } from './keep-up-widget/keep-up-widget.component';
import { ManageWidgetComponent } from './manage-widget/manage-widget.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AdminComponent } from './admin/admin.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';

@NgModule({
  declarations: [OfficialComponent, CompetitionComponent, GeneralComponent,
    CompDatePipe, RegistrationComponent, DirectionsComponent, ScheduleComponent,
    ScheduleDayPipe, MobileRowComponent, MobileRowOfficialComponent, DesktopOfficialTableComponent, MyCompetitionsComponent, MyDesktopTableComponent, CompDaysPipe, MyMobileRowComponent, OrganizeWidgetComponent, KeepUpWidgetComponent, ManageWidgetComponent, CandidateComponent, AdminComponent, DisclaimerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatTabsModule,
    HtmlViewerModule,
    FontAwesomeModule,
    SharedComponentsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    PageModule
  ]
})
export class CompetitionsModule { }
