import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
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
  hiddenControl: FormControl;
  officialControl: FormControl
  initComplete: boolean = false;

  constructor(private compSVC: CompetitionEditService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.officialControl = new FormControl();
    this.hiddenControl = new FormControl();
    this.initComplete = true;
    this.setControls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initComplete) {
      if (changes.competition || changes.registration) {
        this.setControls();
      }
    }
  }

  setControls() {
    this.officialControl.setValue(this.competition.isOfficial);
    this.hiddenControl.setValue(this.competition.isHidden);
    this.registration.isComplete ? this.officialControl.enable() : this.officialControl.disable();
    this.competition.isOfficial ? this.hiddenControl.enable() : this.hiddenControl.disable();

  }

  officialChange() {
    let message = this.competition.isOfficial ? "Sei sicuro di voler annullare la pubblicazione della competizione?" : "Sei sicuro di voler pubblicare la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        let compClone: CompetitionModel = Deserialize(Serialize(this.competition), CompetitionModel);
        compClone.isOfficial = !compClone.isOfficial;
        this.compSVC.adminUpdateCompetition(compClone).subscribe((res: CompetitionModel) => this.competitionChange.emit(res));
      } else {
        this.officialControl.setValue(!this.officialControl.value);
      }
    });
  }

  hiddenChange() {
    let message = this.competition.isHidden ? "Sei sicuro di voler rendere visibile la competizione?" : "Sei sicuro di voler nascondere la competizione?";
    let obs = this.createDialog(message);
    obs.subscribe((result: boolean) => {
      if (result) {
        let compClone: CompetitionModel = Deserialize(Serialize(this.competition), CompetitionModel);
        compClone.isHidden = !compClone.isHidden;
        this.compSVC.adminUpdateCompetition(compClone).subscribe((res: CompetitionModel) => this.competitionChange.emit(res));
      } else {
        this.hiddenControl.setValue(!this.hiddenControl.value);
      }
    });
  }

  deleteCompetition() {
    let obs = this.createDialog("Sei sicuro di voler cancellare la competizione? l'azione non è reversibile");
    obs.subscribe((result: boolean) => {
      if (result) {
        this.compSVC.deleteCompetition(this.competition.id).subscribe(() => this.router.navigate(['/competizioni']));
      }
    });
  }

  private createDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '200px',
      data: message
    });

    return dialogRef.afterClosed();
  }

}
