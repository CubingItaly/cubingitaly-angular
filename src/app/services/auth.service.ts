import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBase: string = "/api/v0";
  private cache: UserModel;
  private observable: Observable<UserModel>;
  private cacheTime: number;

  constructor(private http: HttpClient) { }

  public user(): Observable<UserModel> {
    let now = new Date();

    if (this.cache && ((now.getTime() - this.cacheTime) < 30000)) {
      return of(this.cache);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get<UserModel>(this.apiBase + "/users/me")
        .pipe(share(), map(u => {
          this.observable = null;
          let tmp: UserModel = Deserialize(u, UserModel);
          this.cache = tmp;
          return this.cache;
        }));
      this.cacheTime = (new Date()).getTime();
      return this.observable;
    }
  }

  public login(): void {
    window.location.href = window.location.protocol + "//" + window.location.host + this.apiBase + "/auth/wca";
  }

  public logout(): void {
    window.location.href = window.location.protocol + "//" + window.location.host + this.apiBase + "/auth/logout";
  }
}
