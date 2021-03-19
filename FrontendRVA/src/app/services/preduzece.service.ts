import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preduzece } from '../models/preduzece';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  dataChange: BehaviorSubject<Preduzece[]> = new BehaviorSubject<Preduzece[]>([]);
  private readonly API_URL = 'http://localhost:8083/preduzeca/';

  constructor(private httpClient: HttpClient) { }

  public getAllPreduzeca(): Observable<Preduzece[]> {
    this.httpClient.get<Preduzece[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    });
    (error: HttpErrorResponse) => {
      console.log(error.name + ' '+ error.message);
    }
    return this.dataChange.asObservable();
  }

  public addPreduzece(preduzece: Preduzece): void {
    preduzece.id = 0;
    console.log(preduzece);
    this.httpClient.post(this.API_URL, preduzece).subscribe();
  }

  public updatePreduzece(preduzece: Preduzece, id: number): void {
    this.httpClient.put(this.API_URL + id, preduzece).subscribe();
  }

  public deletePreduzece(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }


}
