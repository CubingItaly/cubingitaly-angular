import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { UserModel } from 'src/app/models/user.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { FormControl, NgForm, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CompetitionEditService } from '../services/competition-edit.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { Deserialize, Serialize } from 'cerialize';

@Component({
  selector: 'edit-general-info',
  templateUrl: './general-edit.component.html',
  styleUrls: ['./general-edit.component.css']
})
export class GeneralEditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() competition: CompetitionModel;
  @Output() competitionChange: EventEmitter<CompetitionModel> = new EventEmitter<CompetitionModel>();
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();

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
  delegates: UserModel[];
  organizers: UserModel[];

  editForm: FormGroup;

  constructor(private userSVC: UserService, private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.compSVC.getEvents().subscribe((e: EventModel[]) => { this.eventsList = e; this.setupEvents() });
    this.organizerControl = new FormControl();
    this.delegateControl = new FormControl();

    this.delSub = this.delegateControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchDelegates(name).subscribe((u: UserModel[]) => this.foundDelegates = u.filter((del: UserModel) => this.delegates.findIndex((t: UserModel) => t.id === del.id) < 0));
      });

    this.orgSub = this.organizerControl.valueChanges.pipe(debounceTime(400))
      .subscribe(name => {
        this.userSVC.searchUsers(name).subscribe((u: UserModel[]) => this.foundOrganizers = u.filter((org: UserModel) => this.organizers.findIndex((t: UserModel) => t.id === org.id) < 0));
      });

    this.setupFormControl();
  }

  setupFormControl(): void {
    this.delegates = [... this.competition.delegates];
    this.organizers = [... this.competition.organizers];
    this.editForm = new FormGroup({
      id: new FormControl({ value: this.competition.id, disabled: true }, Validators.required),
      name: new FormControl(this.competition.name, Validators.required),
      country: new FormControl(this.competition.country, Validators.required),
      province: new FormControl(this.competition.province),
      city: new FormControl(this.competition.city, Validators.required),
      address: new FormControl(this.competition.address, Validators.required),
      location: new FormControl(this.competition.location, Validators.required),
      locationURL: new FormControl(this.competition.locationURL),
      locationDetails: new FormControl(this.competition.locationDetails),
      logoURL: new FormControl(this.competition.logoURL),
      contactName: new FormControl(this.competition.contactName, Validators.required),
      contactEmail: new FormControl(this.competition.contactEmail, [Validators.required, Validators.email]),
      extraInformation: new FormControl(this.competition.extraInformation),
      startDate: new FormControl(this.competition.startDate, Validators.required),
      endDate: new FormControl(this.competition.endDate, Validators.required)
    });

  }

  ngOnDestroy() {
    this.orgSub.unsubscribe();
    this.delSub.unsubscribe();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes['competition'].currentValue !== changes['competition'].previousValue && changes['competition'].previousValue !== undefined) {
      this.setupEvents();
      this.setupFormControl();
    }
  }

  setupEvents() {
    this.selectedEvents = [];
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
    this.delegates.push(this.foundDelegates.find((u: UserModel) => u.id === event.option.value));
    this.delegateControl.setValue(null);
    this.delegateInput.nativeElement.value = "";
  }

  removeDelegate(id: number) {
    this.delegates = this.delegates.filter((d: UserModel) => d.id !== id);
  }

  addOrganizer(event: MatAutocompleteSelectedEvent) {
    this.organizers.push(this.foundOrganizers.find((u: UserModel) => u.id === event.option.value));
    this.organizerControl.setValue(null);
    this.organizerInput.nativeElement.value = "";
  }

  removeOrganizer(id: number) {
    this.organizers = this.organizers.filter((d: UserModel) => d.id !== id);
  }

  onSubmit() {
    let events: EventModel[] = [];

    for (let e of this.selectedEvents) {
      if (e.isSelected) {
        events.push(this.eventsList.find((t: EventModel) => t.id === e.id));
      }
    }

    if (this.editForm.valid && this.organizers.length > 0 && this.delegates.length > 0 && events.length > 0) {
      let updatedCompetition: CompetitionModel = Deserialize(Serialize(this.competition), CompetitionModel);
      updatedCompetition.id = this.editForm.controls['id'].value;
      updatedCompetition.name = this.editForm.controls['name'].value;
      updatedCompetition.startDate = this.editForm.controls['startDate'].value;
      updatedCompetition.endDate = this.editForm.controls['endDate'].value;
      updatedCompetition.country = this.editForm.controls['country'].value;
      updatedCompetition.province = this.editForm.controls['province'].value;
      updatedCompetition.city = this.editForm.controls['city'].value;
      updatedCompetition.address = this.editForm.controls['address'].value;
      updatedCompetition.location = this.editForm.controls['location'].value;
      updatedCompetition.locationURL = this.editForm.controls['locationURL'].value;
      updatedCompetition.locationDetails = this.editForm.controls['locationDetails'].value;
      updatedCompetition.extraInformation = this.editForm.controls['extraInformation'].value;
      updatedCompetition.contactName = this.editForm.controls['contactName'].value;
      updatedCompetition.contactEmail = this.editForm.controls['contactEmail'].value;
      updatedCompetition.logoURL = this.editForm.controls['logoURL'].value;
      updatedCompetition.organizers = [...this.organizers];
      updatedCompetition.delegates = [...this.delegates];
      updatedCompetition.events = events;

      this.compSVC.updateCompetition(updatedCompetition).subscribe((res: CompetitionModel) => {
        this.competition = res;
        this.competitionChange.emit(res);
        this.actionAfterUpdate();
      });
    } else {
      throw new BadRequestError("Per poter aggiornare una competizione è necessario tutti i dati richiesti, inclusi delegati, organizzatori ed eventi.");
    }
  }


  private actionAfterUpdate() {
    this.setupEvents();
    this.setupFormControl();
    const pageTitle = document.querySelector('h1') as HTMLElement;
    pageTitle.scrollIntoView();
    this.updated.emit(true);
    setTimeout(() => {
      this.updated.emit(false);
    }, 7000);
  }

}
