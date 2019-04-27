import { Route } from "@angular/router";
import { OfficialComponent } from "./official/official.component";
import { CompetitionComponent } from "./competition/competition.component";
import { MyCompetitionsComponent } from "./my-competitions/my-competitions.component";
import { CandidateComponent } from "./candidate/candidate.component"
import { AdminComponent } from "./admin/admin.component";


export const routes: Route[] = [
    {
        path: '', component: OfficialComponent
    },
    {
        path: 'proposte', component: CandidateComponent
    },
    {
        path: 'mie', component: MyCompetitionsComponent
    },
    {
        path: 'admin', component: AdminComponent
    },
    {
        path: ':id', component: CompetitionComponent
    }
]