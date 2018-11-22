import { Route } from '@angular/router';
import { CandidateComponent } from './candidate/candidate.component';

export const routes: Route[] = [
    { path: '', redirectTo: 'proposte', pathMatch: 'full' },
    { path: 'proposte', component: CandidateComponent }
];