import { Route } from "@angular/router";
import { FaqComponent } from "./faq/faq.component";
import { FaqEditComponent } from "./faq-edit/faq-edit.component";
import { FaqAdminComponent } from "./faq-admin/faq-admin.component";
import { FAQGuardService } from "./services/faq-guard.service";

export const routes: Route[] = [
    { path: '', component: FaqComponent },
    { path: 'admin', canActivate: [FAQGuardService], component: FaqAdminComponent },
    { path: 'new', canActivate: [FAQGuardService], component: FaqEditComponent, data: { intent: "new", role: "admin" } },
    { path: 'edit/:id', canActivate: [FAQGuardService], component: FaqEditComponent }
];