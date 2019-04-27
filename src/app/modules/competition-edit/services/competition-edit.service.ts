import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CompetitionModel } from 'src/app/models/competition.model';
import { map, share } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { RegistrationModel } from 'src/app/models/competition/registration.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { ScheduleModel } from 'src/app/models/competition/schedule.model';
import { EventModel } from 'src/app/models/competition/event.model';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import { PaymentMeanModel } from 'src/app/models/competition/paymentmean.model';
import { ExtraTabModel } from 'src/app/models/competition/extratab.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionEditService {

  private apiBase: string = "/api/v0/competitions";
  constructor(private http: HttpClient) {
    this.cache = new Map();
    this.observable = new Map();
    this.cacheTime = new Map();
  }
  private cache: Map<string, CompetitionModel>;
  private observable: Map<string, Observable<CompetitionModel>>;
  private cacheTime: Map<string, number>;


  public getCompetition(id: string): Observable<CompetitionModel> {
    let now = new Date();

    if (this.cache[id] && ((now.getTime() - this.cacheTime[id]) < 2000)) {
      return of(this.cache[id]);
    } else if (this.observable[id]) {
      return this.observable[id];
    } else {
      this.observable[id] = this.http.get<CompetitionModel>(this.apiBase + "/" + id)
        .pipe(share(), map(u => {
          this.observable[id] = null;;
          let tmp: CompetitionModel = Deserialize(u, CompetitionModel);
          this.cache[id] = tmp;
          return this.cache[id];
        }));
      this.cacheTime[id] = (new Date()).getTime();
      return this.observable[id];
    }
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

  public deleteCompetition(comp: string): Observable<void> {
    return this.http.delete<void>(this.apiBase + "/" + comp);
  }

  public updateCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.put<CompetitionModel>(this.apiBase + "/" + competition.id, { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
  }

  public adminUpdateCompetition(competition: CompetitionModel): Observable<CompetitionModel> {
    return this.http.put<CompetitionModel>(this.apiBase + "/" + competition.id + "/announce", { "competition": competition }).pipe(map(res => Deserialize(res, CompetitionModel)));
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

  public getIfExists(id: string): Observable<any> {
    return this.http.get<any>(this.apiBase + "/" + id + "/exists");
  }

  public getCompetitionExtraTabs(competition: string): Observable<ExtraTabModel[]> {
    return this.http.get(this.apiBase + "/" + competition + "/tabs").pipe(map(res => Deserialize(res, ExtraTabModel)));
  }

  public deleteTab(cid: string, tid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${cid}/tabs/${tid}`);
  }

  public moveTab(cid: string, tid: string, delta: number): Observable<ExtraTabModel[]> {
    return this.http.put<ExtraTabModel[]>(`${this.apiBase}/${cid}/tabs/${tid}/move`, { delta: delta }).pipe(map(res => Deserialize(res, ExtraTabModel)));
  }

  public updateTab(cid: string, tab: ExtraTabModel): Observable<ExtraTabModel[]> {
    return this.http.put<ExtraTabModel>(`${this.apiBase}/${cid}/tabs/${tab.id}`, { tab: tab }).pipe(map(res => Deserialize(res, ExtraTabModel)));;
  }

  public newTab(cid: string, tab: ExtraTabModel): Observable<ExtraTabModel[]> {
    return this.http.post<ExtraTabModel>(`${this.apiBase}/${cid}/tabs`, { tab: tab }).pipe(map(res => Deserialize(res, ExtraTabModel)));;
  }
}
