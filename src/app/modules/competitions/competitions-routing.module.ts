import { Route } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';
import { CompetitionComponent } from './competition/competition.component';

export const routes: Route[] = [
    { path: '', component: CompetitionComponent },
    { path: 'proposte', component: CandidateComponent }
];