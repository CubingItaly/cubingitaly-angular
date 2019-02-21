import { Injectable } from '@angular/core';
import { CompetitionModel } from '../../../models/competition.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Deserialize } from 'cerialize';
import { map } from 'rxjs/operators';
import { EventModel } from 'src/app/models/competition/event.model';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private apiBase: string = "/api/v0/competitions";
  constructor(private http: HttpClient) { }

  public createCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.post<CompetitionModel>(this.apiBase, { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public updateCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.put<CompetitionModel>(this.apiBase + "/" + competition.id, { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getCompetition(id: string): Observable<CompetitionModel> {
    return this.http.get<CompetitionModel>(this.apiBase + "/" + id).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiBase + "/events").pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public getRegistration(comp: string): Observable<RegistrationModel> {
    return this.http.get<RegistrationModel>(this.apiBase + "/" + comp + "/registrations").pipe(map(res => Deserialize(res, RegistrationModel)));
  }

  public updateRegistration(comp: string, registration: RegistrationModel): Observable<RegistrationModel> {
    return this.http.put<RegistrationModel>(this.apiBase + "/" + comp + "/registrations", { registration: registration }).pipe(map(res => Deserialize(res, RegistrationModel)));
  }

  public getTravelMeans(): Observable<TravelMeanModel[]> {
    return this.http.get<TravelMeanModel>(this.apiBase + "/travelmeans").pipe(map((res: TravelMeanModel) => Deserialize(res, TravelMeanModel)));
  }

  public getPaymentMeans(): Observable<PaymentMeanModel[]> {
    return this.http.get<PaymentMeanModel>(this.apiBase + "/paymentmeans").pipe(map((res: PaymentMeanModel) => Deserialize(res, PaymentMeanModel)));
  }
}
