import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { UserModel } from 'src/app/models/user.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { FormControl, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CompetitionEditService } from '../services/competition-edit.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit-general-info',
  templateUrl: './general-edit.component.html',
  styleUrls: ['./general-edit.component.css']
})
export class GeneralEditComponent implements OnInit, OnDestroy {

  @Input() competition: CompetitionModel;
  @Output() competitionChange: EventEmitter<CompetitionModel> = new EventEmitter<CompetitionModel>();
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('newComp') newComp: NgForm;
  @ViewChild('delegateInput') delegateInput: ElementRef<HTMLInputElement>;
  @ViewChild('organizerInput') organizerInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  private eventsList: EventModel[];
  selectedEvents: { id: string, name: string, isSelected: boolean }[] = [];

  foundDelegates: UserModel[] = [];
  foundOrganizers: UserModel[] = [];
  delegateControl: FormControl;
  organizerControl: FormControl;
  private orgSub: Subscription;
  private delSub: Subscription;

  constructor(private userSVC: UserService, private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.compSVC.getEvents().subscribe((e: EventModel[]) => { this.eventsList = e; this.setupEvents() });
    this.organizerControl = new FormControl();
    this.delegateControl = new FormControl();

    this.delSub = this.delegateControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchDelegates(name).subscribe((u: UserModel[]) => this.foundDelegates = u.filter((del: UserModel) => this.competition.delegates.findIndex((t: UserModel) => t.id === del.id) < 0));
      });

    this.orgSub = this.organizerControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchUsers(name).subscribe((u: UserModel[]) => this.foundOrganizers = u.filter((org: UserModel) => this.competition.organizers.findIndex((t: UserModel) => t.id === org.id) < 0));
      });

  }

  ngOnDestroy() {
    this.orgSub.unsubscribe();
    this.delSub.unsubscribe();
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
      this.compSVC.updateCompetition(this.competition).subscribe((res: CompetitionModel) => {
        this.competition = res;
        this.competitionChange.emit(this.competition);
        this.actionAfterUpdate();
      });
    } else {
      throw new BadRequestError("Per poter aggiornare una competizione è necessario tutti i dati richiesti, inclusi delegati, organizzatori ed eventi.");
    }
  }


  private actionAfterUpdate() {
    const pageTitle = document.querySelector('h1') as HTMLElement;
    pageTitle.scrollIntoView();
    this.updated.emit(true);
    setTimeout(() => {
      this.updated.emit(false);
    }, 7000);
  }

}
