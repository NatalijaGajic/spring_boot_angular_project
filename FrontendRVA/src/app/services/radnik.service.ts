import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Radnik } from '../models/radnik';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  //injektovanje zavisnosti, ne mora manuelno dodavanje servise u providers u app-module
  providedIn: 'root'
})
export class RadnikService {
  //klasa koja sluzi za komunikaciju sa servisom, salje http zahteve

  private readonly API_URL = 'http://localhost:8083/radnici/';
  //cuvanje radnika, wrapuje; koncept asinhronog programiranja
  //tipa observable; observable vraca vise vrednosti, promise jednu
  //observable => tok koji emituje vrednosti, na koji se moze subscribe-ovati
  //subscribe-ujemo na izvor podataka
  dataChange: BehaviorSubject<Radnik[]> = new BehaviorSubject<Radnik[]>([]);

  constructor( private httpClient: HttpClient) {}

  public getAllRadnici(): Observable<Radnik[]> {
    this.httpClient.get<Radnik[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    });
    (error: HttpErrorResponse) => {
      console.log(error.name + ' '+ error.message);
    }
    return this.dataChange.asObservable();
  }

  public addRadnik(radnik: Radnik): void {
    radnik.id = 0;
    this.httpClient.post(this.API_URL, radnik).subscribe();
  }

  public updateRadnik(radnik: Radnik, id: number): void {
    this.httpClient.put(this.API_URL + id, radnik).subscribe();
  }

  public deleteRadnik(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
