import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sektor } from '../models/sektor';

@Injectable({
  providedIn: 'root'
})
export class SektorService {

  private readonly API_URL = 'http://localhost:8083/sektori/';
  private readonly API_URL_PREDUZECE = 'http://localhost:8083/sektori/preduzece/';
  dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);


  constructor(private httpClient: HttpClient) { }

  public getAllSektori(): Observable<Sektor[]> {
    this.httpClient.get<Sektor[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    });
    (error: HttpErrorResponse) => {
      console.log(error.name + ' '+ error.message);
    }
    return this.dataChange.asObservable();
  }

  public addSektor(sektor: Sektor): void {
    sektor.id = 0;
    this.httpClient.post(this.API_URL, sektor).subscribe();
  }

  public updateSektor(sektor: Sektor, id: number): void {
    this.httpClient.put(this.API_URL + id, sektor).subscribe();
  }

  public deleteSektor(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

  public getSektoriByPreduzece(idPreduzeca: number): Observable<Sektor[]> {
    this.httpClient.get<Sektor[]>(this.API_URL_PREDUZECE + idPreduzeca).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
    return this.dataChange.asObservable();
  }

}
