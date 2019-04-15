import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompetitionModel } from 'src/app/models/competition.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiBase: string = "/api/v0/competitions";
  constructor(private http: HttpClient) { }

  public getCompetition(id: string): Observable<CompetitionModel> {
    return this.http.get<CompetitionModel>(this.apiBase + "/" + id).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getRegistration(comp: string): Observable<RegistrationModel> {
    return this.http.get<RegistrationModel>(this.apiBase + "/" + comp + "/registrations").pipe(map(res => Deserialize(res, RegistrationModel)));
  }

  public getSchedule(competition: string): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(`${this.apiBase}/${competition}/schedule`).pipe(map(res => Deserialize(res, ScheduleModel)));
  }

  public getDirections(id: string): Observable<DirectionsModel[]> {
    return this.http.get<DirectionsModel[]>(this.apiBase + "/" + id + "/directions").pipe(map(res => Deserialize(res, DirectionsModel)));
  }

  public getOfficialCompetitions(): Observable<CompetitionModel[]> {
    return this.http.get(this.apiBase + "/official").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getUpcomingCompetitions(): Observable<CompetitionModel[]> {
    return this.http.get(this.apiBase + "/upcoming").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getOnGoingCompetitions(): Observable<CompetitionModel[]> {
    return this.http.get(this.apiBase + "/ongoing").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getPastCompetitions(): Observable<CompetitionModel[]> {
    return this.http.get(this.apiBase + "/past").pipe(map(res => Deserialize(res, CompetitionModel)));
  }
}
