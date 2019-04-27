import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CompetitionEditService } from './competition-edit.service';
import { UserModel } from 'src/app/models/user.model';
import { CompetitionModel } from 'src/app/models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompEditGuardService implements CanActivate {

  constructor(private router: Router, private authSVC: AuthService, private compSVC: CompetitionEditService) { }

  async canActivate(route: ActivatedRouteSnapshot) {
    let user: UserModel = await this.authSVC.user().toPromise();
    let role: string = route.data.requiredRole;
    if (user.id) {
      if (role === "editor") {
        let comp: CompetitionModel = await this.compSVC.getCompetition(route.paramMap.get("id")).toPromise()
        if (comp.id) {
          if (user.canEditCompetition(comp)) {
            return true;
          } else {
            this.router.navigate(['permesso-negato']);
          }
        }
      } else if (role === "admin") {
        if (user.canAdminCompetitions()) {
          return true;
        } else {
          this.router.navigate(['permesso-negato']);
        }
      } else if (role === "creator") {
        if (user.canCreateCompetitions()) {
          return true;
        } else {
          this.router.navigate(['permesso-negato']);
        }
      }
    } else {
      this.router.navigate(['permesso-negato']);
    }
  }
}

