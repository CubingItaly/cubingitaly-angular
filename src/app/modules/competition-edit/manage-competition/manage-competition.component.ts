import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { CompetitionEditService } from '../services/competition-edit.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Serialize, Deserialize } from 'cerialize';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-competition',
  templateUrl: './manage-competition.component.html',
  styleUrls: ['./manage-competition.component.css']
})
export class ManageCompetitionComponent implements OnInit, OnChanges {

  @Input() competition: CompetitionModel;
  @Output() competitionChange: EventEmitter<CompetitionModel> = new EventEmitter<CompetitionModel>();
  @Input() registration: RegistrationModel;
  @Input() schedule: ScheduleModel[];
  @Input() directions: DirectionsModel[];
  hiddenControl: FormControl;
  officialControl: FormControl

  private compClone: CompetitionModel;

  constructor(private compSVC: CompetitionEditService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.compClone = Deserialize(Serialize(this.competition), CompetitionModel);
    this.setControls();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['competition'].previousValue !== undefined) {
      this.compClone = Deserialize(Serialize(changes['competition'].currentValue), CompetitionModel);
    }
  }

  setControls() {
    this.officialControl = new FormControl({ value: this.compClone.isOfficial, disabled: (!this.compClone.isOfficial && !this.registration.isComplete) });
    this.hiddenControl = new FormControl({ value: this.compClone.isHidden, disabled: !this.registration.isComplete });
  }

  deleteCompetition() {
    let obs = this.createDialog("Sei sicuro di voler cancellare la competizione? l'azione non è reversibile");
    obs.subscribe((result: boolean) => {
      if (result) {
        this.compSVC.deleteCompetition(this.compClone.id).subscribe(() => this.router.navigate(['/']));
      }
    });
  }

  officialSlider(event: MatSlideToggleChange) {
    let message = this.compClone.isOfficial ? "Sei sicuro di voler annullare la pubblicazione della competizione?" : "Sei sicuro di voler pubblicare la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        this.compClone.isOfficial = event.checked;
        this.adminUpdateCompetition();
      } else {
        this.officialControl.setValue(!event.checked);
      }
    });
  }

  hiddenSlider(event: MatSlideToggleChange) {
    let message = this.compClone.isHidden ? "Sei sicuro di voler rendere visibile la competizione?" : "Sei sicuro di voler nascondere la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        this.compClone.isHidden = event.checked;
        this.adminUpdateCompetition();
      } else {
        this.hiddenControl.setValue(!event.checked);
      }
    });
  }

  private adminUpdateCompetition() {
    this.compSVC.adminUpdateCompetition(this.compClone).subscribe((res: CompetitionModel) => this.competitionChange.emit(res));
  }

  private createDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '200px',
      data: message
    });

    return dialogRef.afterClosed();
  }

}
