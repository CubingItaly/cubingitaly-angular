import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition.model';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionEditService {

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

  public getOfficialCompetitions(): Observable<CompetitionModel[]> {
    return this.http.get(this.apiBase + "/official").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiBase + "/events").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public createCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.post<CompetitionModel>(this.apiBase, { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public updateCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.put<CompetitionModel>(this.apiBase + "/" + competition.id, { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public adminUpdateCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.put<CompetitionModel>(this.apiBase + "/" + competition.id+"/announce", { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getTravelMeans(): Observable<TravelMeanModel[]> {
    return this.http.get<TravelMeanModel[]>(this.apiBase + "/travelmeans").pipe(map(res => Deserialize(res, TravelMeanModel)));
  }

  public getDirections(id: string): Observable<DirectionsModel[]> {
    return this.http.get<DirectionsModel[]>(this.apiBase + "/" + id + "/directions").pipe(map(res => Deserialize(res, DirectionsModel)));
  }

  public createDirections(direction: DirectionsModel, comp: string): Observable<DirectionsModel> {
    return this.http.post<DirectionsModel>(this.apiBase + "/" + comp + "/directions", { directions: direction }).pipe(map(res => Deserialize(res, DirectionsModel)));
  }

  public updateDirections(direction: DirectionsModel, comp: string): Observable<DirectionsModel> {
    return this.http.put<DirectionsModel>(this.apiBase + "/" + comp + "/directions/" + direction.id, { directions: direction }).pipe(map(res => Deserialize(res, DirectionsModel)));
  }

  public deleteDirections(direction: number, comp: string): Observable<void> {
    return this.http.delete<void>(this.apiBase + "/" + comp + "/directions/" + direction);
  }

  public importSchedule(competition: string): void {
    window.location.href = window.location.protocol + "//" + window.location.host + `/api/v0/competitions/schedule/${competition}/wca`;
  }

  public updateRegistration(comp: string, registration: RegistrationModel): Observable<RegistrationModel> {
    return this.http.put<RegistrationModel>(this.apiBase + "/" + comp + "/registrations", { registration: registration }).pipe(map(res => Deserialize(res, RegistrationModel)));
  }

  public getPaymentMeans(): Observable<PaymentMeanModel[]> {
    return this.http.get<PaymentMeanModel>(this.apiBase + "/paymentmeans").pipe(map(res => Deserialize(res, PaymentMeanModel)));
  }

}
