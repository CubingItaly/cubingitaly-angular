import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel } from 'src/app/models/page.model';
import { map } from 'rxjs/operators';
import { Deserialize } from 'cerialize';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseAPI: string = "/api/v0/pages/";

  constructor(private http: HttpClient) { }

  public getPage(id: number): Observable<PageModel> {
    return this.http.get<PageModel>(this.baseAPI + id).pipe(map(res => Deserialize(res, PageModel)));
  }

  public updatePage(page: PageModel): Observable<PageModel> {
    return this.http.put<PageModel>(this.baseAPI + page.id, { "page": page }).pipe(map(res => Deserialize(res, PageModel)));
  }
}
