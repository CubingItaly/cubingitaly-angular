import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';
import { EventModel } from 'src/app/models/competition.events.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition: CompetitionModel = new CompetitionModel();
  events: EventModel[] = [];
  eventsId: string[] = ["222", "333", "444", "555", "666", "777", "333bf", "333oh", "333fm", "333ft", "444bf", "555bf", "333mbf", "sq1", "clock", "minx", "pyram", "skewb"];
  eventWeight: number[] = [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 15, 11, 12, 13, 14];

  constructor() {
    this.competition.id = "EtnaOpen2019";
    this.competition.name = "Etna Open 2019";
    this.competition.startDate = new Date("2019-05-04");
    this.competition.endDate = new Date("2019-05-05");
    this.competition.country = "Italia";
    this.competition.city = "Catania";
    this.competition.address = "Piazza Europa, livello -1, 95127 Catania CT";
    this.competition.addressURL = "https://www.google.com/maps/place/37.517056,15.106655";
    this.competition.location = "Borghetto Europa";
    this.competition.locationDetails = "Sala Agorà";
    this.competition.coordinates = "";
    this.competition.logoURL = "https://i.imgur.com/ikPWvQi.png";
    this.competition.competitorsLimit = 80;
    this.competition.registrationFree = false;
    this.competition.registrationFee = 16;
    this.competition.newcomersFee = 16;
    this.competition.canRegisterAtVenue = true;
    this.competition.registrationAtVenue = 15;
    this.competition.atTheVenueDetails = "È possibile registrarsi in loco fino al raggiungimento del limite partecipanti.";
    this.competition.registrationOpen = new Date("2019-01-01");
    this.competition.registrationClose = new Date("2019-02-28");
    this.competition.maxGuestsNumber = 2;
    this.competition.guestsPay = false;
    this.competition.guestsFee = 0;
    this.competition.guestsFeeInfo = "Gli spettatori non devono registrarsi."
    this.competition.isLimitReached = false;
    this.competition.isRegistrationOpen = true;
    this.competition.contactEmail = "speedcubingcatania@gmail.com";
    this.competition.contactName = "Soeedcubing Catania";
    this.competition.delegates = null;
    this.competition.organizers = null;
    this.competition.extraInformation = "La competizione è sponsorizzata dalla ditta produttrice di cubi Moyu. È inoltre possibile acquistare la t-shirt della competizione al costo di 10€.";
    for (let i = 0; i < this.eventsId.length; i++) {
      let e: EventModel = new EventModel();
      e.id = this.eventsId[i];
      e.weight = this.eventWeight[i];
      this.events.push(e);
    }
    this.events.sort((a: EventModel, b: EventModel) => { if (a.weight > b.weight) return 1; if (b.weight > a.weight) return -1; return 0; })
    this.competition.events = this.events;


  }

  ngOnInit() {
  }

}
