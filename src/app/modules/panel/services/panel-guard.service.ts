import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PanelGuardService implements CanActivate {

  constructor(private authSVC: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    let user: UserModel = await this.authSVC.user().toPromise();
    if (user.id)
      return true;
    this.router.navigate(['permesso-negato']);
  }
}