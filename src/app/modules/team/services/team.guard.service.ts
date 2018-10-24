import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeamModel } from 'src/app/models/team.model';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamRoleService implements CanActivate {
  constructor(private authSVC: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let user: UserModel = await this.authSVC.user().toPromise();
    if (user.id) {
      const requiredRole: string = route.data.requiredRole;
      if (requiredRole == 'admin') {
        if (user.canAdminTeams())
          return true;
      } else if (requiredRole == 'manager') {
        let teamId: string = route.params.id;
        let team: TeamModel = new TeamModel();
        team.id = teamId;
        if (user.canManageTeam(team))
          return true;
      }
    }
    this.router.navigate(['permesso-negato']);
  }
}