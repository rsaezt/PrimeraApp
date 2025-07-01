import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FutbolService {
  private API_URL = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga';

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<any> {
    return this.http.get(this.API_URL);
    //.pipe(
      //catchError(error => {
        //console.error('❌ Error al cargar equipos:', error);
        //return of(null);
      //})
    //);
  }
}
