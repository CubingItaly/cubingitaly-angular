import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamModel } from 'src/app/models/team.model';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';
import { UserModel } from 'src/app/models/user.model';
import { RoleModel } from 'src/app/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiBase: string = "/api/v0/teams";

  constructor(private http: HttpClient) {
  }

  public getTeamsList(): Observable<TeamModel[]> {
    return this.http.get<TeamModel[]>(this.apiBase).pipe(map((res => Deserialize(res, TeamModel))));
  }

  public getTeamById(id: string): Observable<TeamModel> {
    return this.http.get<TeamModel>(this.apiBase + "/" + id).pipe(map((res => Deserialize(res, TeamModel))));
  }

  public getTeamMembers(id: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiBase + "/" + id + "/members").pipe(map((res => res.map(u => Deserialize(u, UserModel)))));
  }

  public addTeamMember(team: string, user: number): Observable<RoleModel> {
    return this.http.post<RoleModel>(this.apiBase + "/" + team + "/members", { "member": user }).pipe(map((res => Deserialize(res, RoleModel))));
  }

  public removeTeamMember(team: string, user: number): Observable<void> {
    return this.http.delete<void>(this.apiBase + "/" + team + "/members/" + user);
  }

  public addTeamLeader(team: string, user: number): Observable<RoleModel> {
    return this.http.put<RoleModel>(this.apiBase + "/" + team + "/leaders", { "member": user }).pipe(map((res => Deserialize(res, RoleModel))));;
  }

  public demoteTeamLeader(team: string, user: number): Observable<RoleModel> {
    return this.http.delete<RoleModel>(this.apiBase + "/" + team + "/leaders/" + user).pipe(map((res => Deserialize(res, RoleModel))));;
  }

}
