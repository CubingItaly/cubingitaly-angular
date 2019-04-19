import { Route } from "@angular/router";
import { OfficialComponent } from "./official/official.component";
import { CompetitionComponent } from "./competition/competition.component";
import { MyCompetitionsComponent } from "./my-competitions/my-competitions.component";


export const routes: Route[] = [
    {
        path: '', component: OfficialComponent
    },
    {
        path: 'mie', component: MyCompetitionsComponent
    },
    {
        path: ':id', component: CompetitionComponent
    }
]