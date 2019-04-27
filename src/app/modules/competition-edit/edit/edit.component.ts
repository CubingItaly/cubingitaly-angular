import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionEditService } from '../services/competition-edit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { MetaManagerService } from 'src/app/services/meta-manager.service';
import { TitleManagerService } from 'src/app/services/title-manager.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  competition: CompetitionModel;
  registration: RegistrationModel;
  directions: DirectionsModel[];
  schedule: ScheduleModel[];
  updated: boolean;
  initialTab: number = 0;
  user$: Observable<UserModel>;


  constructor(private router: Router, private authSVC: AuthService, private compSVC: CompetitionEditService, private route: ActivatedRoute, private metaSVC: MetaManagerService, private titleSVC: TitleManagerService) { }

  ngOnInit() {
    let compId: string = this.route.snapshot.paramMap.get("id");
    this.user$ = this.authSVC.user();
    this.initialTab = Number(this.route.snapshot.queryParamMap.get("tab")) || 0;
    this.compSVC.getCompetition(compId).subscribe((res: CompetitionModel) => {
      this.competition = res;
      this.titleSVC.setTitle(`Modifica ${res.name}`);
      this.metaSVC.addMeta("robots", "noindex,nofollow");
    });
    this.compSVC.getRegistration(compId).subscribe((res: RegistrationModel) => this.registration = res);
    this.compSVC.getSchedule(compId).subscribe((res: ScheduleModel[]) => this.schedule = res);
    this.compSVC.getDirections(compId).subscribe((res: DirectionsModel[]) => this.directions = res);
  }

  ngOnDestroy() {
    this.metaSVC.removeMeta("robots");
  }

  updateURL(index: number) {
    if (index > 0) {
      this.router.navigate(['./'], { relativeTo: this.route, queryParams: { tab: index } });
    } else {
      this.router.navigate(['./'], { relativeTo: this.route });
    }
  }
}
