import { Route } from "@angular/router";
import { EditComponent } from './edit/edit.component'
import { NewComponent } from './new/new.component';

export const routes: Route[] = [
    {
        path: 'new', component: NewComponent
    },
    {
        path: ':id', component: EditComponent
    }
]