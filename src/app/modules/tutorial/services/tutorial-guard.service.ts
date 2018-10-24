import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuardService implements CanActivate {

  constructor(private authSVC: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot) {

    let user: UserModel = await this.authSVC.user().toPromise();
    let requiredRole: string = route.data.requiredRole;
    switch (requiredRole) {
      case "edit":
        if (user.id && user.canEditPages())
          return true;
        this.router.navigate(['permesso-negato']);
        break;
      case "create":
        if (user.id && user.canCreateTutorials())
          return true;
        this.router.navigate(['permesso-negato']);
        break;
    }
    return true;
  }
}
