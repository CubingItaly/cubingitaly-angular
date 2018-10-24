import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../page/page.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeamManagementComponent } from './team-management/team-management.component';
import { TeamListComponent } from './team-list/team-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Route } from '@angular/router';
import { TeamRoleService } from './services/team.guard.service';
import { TeamService } from './services/team.service';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  {
    path: 'admin', component: TeamListComponent, canActivate: [TeamRoleService], data: { requiredRole: ['admin'] }
  },
  {
    path: ':id/admin', component: TeamManagementComponent, canActivate: [TeamRoleService], data: { requiredRole: ['manager'] }
  }

]

@NgModule({
  imports: [
    CommonModule,
    PageModule,
    FlexLayoutModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeamManagementComponent, TeamListComponent],
  providers: [TeamService]
})
export class TeamModule { }
