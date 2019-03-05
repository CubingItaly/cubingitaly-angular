import { Route } from "@angular/router";
import { OfficialComponent } from "./official/official.component";
import { CompetitionComponent } from "./competition/competition.component";


export const routes: Route[] = [
    {
        path: '', component: OfficialComponent
    },
    {
        path:':id', component: CompetitionComponent
    }
]