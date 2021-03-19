import { Obrazovanje } from './../models/obrazovanje';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObrazovanjeService {

  private readonly API_URL = 'http://localhost:8083/obrazovanja/';
  dataChange: BehaviorSubject<Obrazovanje[]> = new BehaviorSubject<Obrazovanje[]>([]);


  constructor(private httpClient: HttpClient) { }

  public getAllObrazovanja(): Observable<Obrazovanje[]>{
    this.httpClient.get<Obrazovanje[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    });
    return this.dataChange.asObservable();
  }

  public addObrazovanje(obrazovanje: Obrazovanje): void {
    obrazovanje.id = 0;
    this.httpClient.post(this.API_URL, obrazovanje).subscribe();
  }

  public updateObrazovanje(obrazovanje: Obrazovanje, id: number): void {
    this.httpClient.put(this.API_URL + id, obrazovanje).subscribe();
  }

  public deleteObrazovanje(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
