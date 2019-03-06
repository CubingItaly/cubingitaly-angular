import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { CompetitionEditService } from '../services/competition-edit.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'manage-competition',
  templateUrl: './manage-competition.component.html',
  styleUrls: ['./manage-competition.component.css']
})
export class ManageCompetitionComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Output() competitionChange: EventEmitter<CompetitionModel> = new EventEmitter<CompetitionModel>();
  @Input() registration: RegistrationModel;
  @Input() schedule: ScheduleModel[];
  @Input() directions: DirectionsModel[];
  hiddenControl: FormControl;
  officialControl: FormControl

  constructor(private compSVC: CompetitionEditService, private dialog: MatDialog) { }

  ngOnInit() {
    this.hiddenControl = new FormControl(this.competition.isHidden);
    this.officialControl = new FormControl(this.competition.isOfficial);
  }

  deleteCompetition() {
    let obs = this.createDialog("Sei sicuro di voler cancellare la competizione? l'azione non è reversibile");
    obs.subscribe((result: boolean) => {
      if (result) {
        this.compSVC.deleteCompetition(this.competition.id);
      }
    });
  }

  officialSlider(event: MatSlideToggleChange) {
    let message = this.competition.isOfficial ? "Sei sicuro di voler annullare la pubblicazione della competizione?" : "Sei sicuro di voler pubblicare la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        this.competition.isOfficial = event.checked;
        this.adminUpdateCompetition();
      } else {
        this.officialControl.setValue(!event.checked);
      }
    });
  }

  hiddenSlider(event: MatSlideToggleChange) {
    let message = this.competition.isHidden ? "Sei sicuro di voler rendere visibile la competizione?" : "Sei sicuro di voler nascondere la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        this.competition.isHidden = event.checked;
        this.adminUpdateCompetition();
      } else {
        this.hiddenControl.setValue(!event.checked);
      }
    });
  }

  private adminUpdateCompetition() {
    this.compSVC.adminUpdateCompetition(this.competition).subscribe((res: CompetitionModel) => this.competitionChange.emit(res));
  }

  private createDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '200px',
      data: message
    });

    return dialogRef.afterClosed();
  }

}
