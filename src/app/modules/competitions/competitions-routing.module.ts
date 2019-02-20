import { Route } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { CompetitionComponent } from './competition/competition.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';

export const routes: Route[] = [
    { path: '', redirectTo: 'new', pathMatch: 'full' },
    { path: ':id/edit', component: EditComponent },
    { path: 'new', component: NewComponent },
    { path: 'proposte', component: CandidateComponent },
    { path: ':id', component: CompetitionComponent }
];