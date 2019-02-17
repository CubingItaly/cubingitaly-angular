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
    this.competition.id = "CalabrianOpen2019";
    this.competition.name = "Calabrian Open 2019";
    this.competition.startDate = new Date("2019-03-02");
    this.competition.endDate = new Date("2019-03-03");
    this.competition.country = "Italia";
    this.competition.province = "Catanzaro";
    this.competition.city = "Lamezia Terme";
    this.competition.address = "Piazza Stazione Centrale, 88046 Lamezia Terme (CZ)";
    this.competition.addressURL = "https://www.google.com/maps/place/38.920938,16.255517";
    this.competition.location = "Gran Hotel Lamezia";
    this.competition.locationDetails = "Sala n° 7";
    this.competition.coordinates = "";
    this.competition.logoURL = "http://i63.tinypic.com/xn6mhv.jpg";
    this.competition.competitorsLimit = 70;
    this.competition.registrationFree = false;
    this.competition.registrationFee = 15;
    this.competition.newcomersFee = 10;
    this.competition.newcomersDetails = "I partecipanti alla prima competizione saranno rimborsati 5€ in loco."
    this.competition.canRegisterAtVenue = true;
    this.competition.registrationAtVenue = 15;
    this.competition.atTheVenueDetails = "È possibile registrarsi solamente nel 3x3.";
    this.competition.registrationOpen = new Date("2018-12-04");
    this.competition.registrationClose = new Date("2019-02-22");
    this.competition.maxGuestsNumber = 2;
    this.competition.guestsPay = false;
    this.competition.guestsFee = 0;
    this.competition.guestsNeedToRegister = false;
    this.competition.isLimitReached = false;
    this.competition.isRegistrationOpen = true;
    this.competition.contactEmail = "cubingitaly@gmail.com";
    this.competition.contactName = "Cubing Italy";
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
