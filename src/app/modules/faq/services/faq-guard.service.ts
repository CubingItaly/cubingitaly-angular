import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
    providedIn: 'root'
})

export class FAQGuardService implements CanActivate {

    constructor(private router: Router, private authSVC: AuthService) { }

    async canActivate(route: ActivatedRouteSnapshot) {
        let user: UserModel = await this.authSVC.user().toPromise();
        let role: string = route.data.requiredRole;
        if (user.id && user.canEditFAQs()) {
            if (role && role == "admin") {
                if (user.canAdminFAQs()) {
                    return true;
                }
                this.router.navigate(['permesso-negato']);
            }
            return true;
        }
        this.router.navigate(['permesso-negato']);
    }
}
