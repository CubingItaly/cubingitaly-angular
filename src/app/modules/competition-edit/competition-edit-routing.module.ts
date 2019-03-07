import { Route } from "@angular/router";
import { EditComponent } from './edit/edit.component'
import { NewComponent } from './new/new.component';
import { CompEditGuardService } from "./services/comp-edit-guard.service";

export const routes: Route[] = [
    {
        path: 'new', canActivate: [CompEditGuardService], component: NewComponent, data: { "requiredRole": "creator" }
    },
    {
        path: ':id', canActivate: [CompEditGuardService], component: EditComponent, data: { "requiredRole": "editor" }
    }
]