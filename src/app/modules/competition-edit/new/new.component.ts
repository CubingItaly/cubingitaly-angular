import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { UserModel } from 'src/app/models/user.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { BadRequestError } from 'src/app/errors/bad.request.error';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { CompetitionEditService } from '../services/competition-edit.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {


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
  private idSub: Subscription;
  delegates: UserModel[];
  organizers: UserModel[];
  private competition: CompetitionModel;
  idExists: boolean = false;

  editForm: FormGroup;

  constructor(private userSVC: UserService, private router: Router, private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.competition = new CompetitionModel();
    this.compSVC.getEvents().subscribe((e: EventModel[]) => { this.eventsList = e; this.setupEvents() });
    this.organizerControl = new FormControl();
    this.delegateControl = new FormControl();
    this.delegates = [];
    this.organizers = [];

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
    this.editForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      province: new FormControl(''),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      locationURL: new FormControl(''),
      locationDetails: new FormControl(''),
      logoURL: new FormControl(''),
      contactName: new FormControl('', Validators.required),
      contactEmail: new FormControl('', [Validators.required, Validators.email]),
      extraInformation: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });

    this.idSub = this.editForm.get('id').valueChanges.pipe(debounceTime(400)).subscribe((id: string) => {
      if (id.length > 0)
        this.compSVC.getIfExists(id).subscribe((res) => this.idExists = res.exists);
    });
  }


  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.orgSub.unsubscribe();
    this.delSub.unsubscribe();
  }

  setupEvents() {
    for (let e of this.eventsList) {
      this.selectedEvents.push({ id: e.id, name: e.name, isSelected: false });
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
    if (this.idExists) {
      throw new BadRequestError("Una competizione con lo stesso ID è già presente.");

    } else if (this.editForm.valid && this.organizers.length > 0 && this.delegates.length > 0 && events.length > 0) {
      this.competition.id = this.editForm.controls['id'].value;
      this.competition.name = this.editForm.controls['name'].value;
      this.competition.startDate = this.editForm.controls['startDate'].value;
      this.competition.endDate = this.editForm.controls['endDate'].value;
      this.competition.country = this.editForm.controls['country'].value;
      this.competition.province = this.editForm.controls['province'].value;
      this.competition.city = this.editForm.controls['city'].value;
      this.competition.address = this.editForm.controls['address'].value;
      this.competition.location = this.editForm.controls['location'].value;
      this.competition.locationURL = this.editForm.controls['locationURL'].value;
      this.competition.locationDetails = this.editForm.controls['locationDetails'].value;
      this.competition.extraInformation = this.editForm.controls['extraInformation'].value;
      this.competition.contactName = this.editForm.controls['contactName'].value;
      this.competition.contactEmail = this.editForm.controls['contactEmail'].value;
      this.competition.logoURL = this.editForm.controls['logoURL'].value;
      this.competition.organizers = [...this.organizers];
      this.competition.delegates = [...this.delegates];
      this.competition.events = events;
      this.competition.isOfficial = false;
      this.competition.isHidden = true;

      this.compSVC.createCompetition(this.competition).subscribe((res: CompetitionModel) => {
        let navigateTo: string = "/competizioni/edit/" + res.id;
        this.router.navigate([navigateTo], { queryParams: { 'tab': 1 } });
      });
    } else {
      throw new BadRequestError("Per poter creare una competizione è necessario tutti i dati richiesti, inclusi delegati, organizzatori ed eventi.");
    }
  }

}
