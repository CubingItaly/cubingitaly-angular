import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionModel } from 'src/app/models/competition.model';
import { UserService } from '../../../services/user.service';
import { EventModel } from 'src/app/models/competition/event.model';
import { UserModel } from 'src/app/models/user.model';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @ViewChild('newComp') newComp: NgForm;
  @ViewChild('delegateInput') delegateInput: ElementRef<HTMLInputElement>;
  @ViewChild('organizerInput') organizerInput: ElementRef<HTMLInputElement>;
  competition: CompetitionModel;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  private eventsList: EventModel[];
  selectedEvents: { id: string, name: string, isSelected: boolean }[] = [];

  foundDelegates: UserModel[] = [];
  foundOrganizers: UserModel[] = [];
  delegateControl: FormControl;
  organizerControl: FormControl;

  constructor(private router: Router, private userSVC: UserService, private compSVC: CompetitionEditService) { }

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

  }

  deleteCompetition() {

  }

  setupEvents() {
    for (let e of this.eventsList) {
      let index = this.competition.events.findIndex((t: EventModel) => t.id === e.id);
      if (index < 0) {
        this.selectedEvents.push({ id: e.id, name: e.name, isSelected: false });
      } else {
        this.selectedEvents.push({ id: e.id, name: e.name, isSelected: true });
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

  addDelegate(event: MatAutocompleteSelectedEvent) {
    this.competition.delegates.push(this.foundDelegates.find((u: UserModel) => u.id === event.option.value));
    this.delegateControl.setValue(null);
    this.delegateInput.nativeElement.value = "";
  }

  removeDelegate(id: number) {
    this.competition.delegates = this.competition.delegates.filter((d: UserModel) => d.id !== id);
  }

  addOrganizer(event: MatAutocompleteSelectedEvent) {
    this.competition.organizers.push(this.foundOrganizers.find((u: UserModel) => u.id === event.option.value));
    this.organizerControl.setValue(null);
    this.organizerInput.nativeElement.value = "";
  }

  removeOrganizer(id: number) {
    this.competition.organizers = this.competition.organizers.filter((d: UserModel) => d.id !== id);
  }

  onSubmit() {
    this.competition.events = [];
    for (let e of this.selectedEvents) {
      if (e.isSelected) {
        this.competition.events.push(this.eventsList.find((t: EventModel) => t.id === e.id));
      }
    }

    if (this.newComp.valid && this.competition.organizers.length > 0 && this.competition.delegates.length > 0 && this.competition.events.length > 0) {
      this.compSVC.createCompetition(this.competition).subscribe((res: CompetitionModel) => {
        let navigateTo: string = "/competizioni/edit/" + res.id;
        this.router.navigate([navigateTo], { queryParams: { 'tab': 1 } });
      });
    } else {
      throw new BadRequestError("Per poter creare una competizione è necessario tutti i dati richiesti, inclusi delegati, organizzatori ed eventi.");
    }
  }

}