import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionModel } from 'src/app/models/competition.model';
import { CompetitionService } from '../services/competition.service';
import { UserService } from '../../../services/user.service';
import { EventModel } from 'src/app/models/competition/event.model';
import { UserModel } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { BadRequestError } from 'src/app/errors/bad.request.error';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChild('delegateInput') delegateInput: ElementRef<HTMLInputElement>;
  @ViewChild('organizerInput') organizerInput: ElementRef<HTMLInputElement>;

  competition: CompetitionModel;
  private eventsList: EventModel[];
  selectedEvents: { id: string, name: string, isSelected: boolean }[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  foundDelegates: UserModel[] = [];
  delegateControl: FormControl;
  foundOrganizers: UserModel[] = [];
  organizerControl: FormControl;
  competitionForm: FormGroup;
  startControl: FormControl;
  endControl: FormControl;


  constructor(private router: Router, private userSVC: UserService, private compSVC: CompetitionService) { }



  ngOnInit() {
    this.compSVC.getEvents().subscribe((e: EventModel[]) => { this.eventsList = e; this.setupEvents() });

    this.competition = new CompetitionModel();
    this.competition.isHidden = true;
    this.competition.isOfficial = false;
    this.competition.events = [];
    this.competition.delegates = [];
    this.competition.organizers = [];
    this.organizerControl = new FormControl();
    this.delegateControl = new FormControl();

    this.delegateControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchDelegates(name).subscribe((u: UserModel[]) => this.foundDelegates = u.filter((del: UserModel) => this.competition.delegates.findIndex((t: UserModel) => t.id === del.id) < 0));
      });

    this.organizerControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchUsers(name).subscribe((u: UserModel[]) => this.foundOrganizers = u.filter((org: UserModel) => this.competition.organizers.findIndex((t: UserModel) => t.id === org.id) < 0));
      });

    this.competitionForm = new FormGroup({
      'id': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl('', [Validators.required]),
      'country': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'location': new FormControl('', [Validators.required]),
      'contactName': new FormControl('', [Validators.required]),
      'contactEmail': new FormControl('', [Validators.required, Validators.email])
    });
  }

  removeDelegate(id: number) {
    this.competition.delegates = this.competition.delegates.filter((d: UserModel) => d.id !== id);
  }

  addDelegate(event: MatAutocompleteSelectedEvent) {
    this.competition.delegates.push(this.foundDelegates.find((u: UserModel) => u.id === event.option.value));
    this.delegateControl.setValue(null);
    this.delegateInput.nativeElement.value = "";
  }

  removeOrganizer(id: number) {
    this.competition.organizers = this.competition.organizers.filter((d: UserModel) => d.id !== id);
  }

  addOrganizer(event: MatAutocompleteSelectedEvent) {
    this.competition.organizers.push(this.foundOrganizers.find((u: UserModel) => u.id === event.option.value));
    this.organizerControl.setValue(null);
    this.organizerInput.nativeElement.value = "";
  }

  setupEvents() {
    for (let e of this.eventsList) {
      let index = this.competition.events.findIndex((t: EventModel) => t.id === e.id);
      if (index < 0) {
        this.selectedEvents.push({ id: e.id, name: e.name, isSelected: false });
      } else {
        this.selectedEvents.push({ id: e.id, name: e.name, isSelected: false });
      }
    }
  }

  addEvent(id: string) {
    for (let i = 0; i < this.selectedEvents.length; i++) {
      if (this.selectedEvents[i].id === id) {
        this.selectedEvents[i].isSelected = !this.selectedEvents[i].isSelected;
        break;
      }
    }
  }


  createCompetition() {
    if (this.competitionForm.valid) {
      this.competition.events = [];
      for (let e of this.selectedEvents) {
        if (e.isSelected) {
          this.competition.events.push(this.eventsList.find((t: EventModel) => t.id === e.id));
        }
      }
      if (this.competition.organizers.length > 0 && this.competition.delegates.length > 0 && this.competition.events.length > 0) {
        this.compSVC.createCompetition(this.competition).subscribe((res: CompetitionModel) => {
          let navigateTo: string = "/competizioni/" + res.id + "/edit";
          this.router.navigate([navigateTo]);
        });
      } else {
        throw new BadRequestError("Per poter creare una competizione è necessario inserire delegati, organizzatori ed eventi.");
      }
    } else {
      throw new BadRequestError("Per creare la competizione è compilare tutti i parametri richiesti.");
    }
  }

  deleteCompetition() {
    this.router.navigate(['/competizioni/admin']);
  }
}

