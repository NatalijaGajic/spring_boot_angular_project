import {  MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { RadnikService } from 'src/app/services/radnik.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Radnik } from 'src/app/models/radnik';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { SektorService } from 'src/app/services/sektor.service';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Sektor } from 'src/app/models/sektor';

@Component({
  selector: 'app-radnik-dijalog',
  templateUrl: './radnik-dijalog.component.html',
  styleUrls: ['./radnik-dijalog.component.css']
})
export class RadnikDijalogComponent implements OnInit {

  public flag: number;

  obrazovanja: Obrazovanje[];
  sektori: Sektor[];

  constructor(private radnikService: RadnikService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnikDijalogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Radnik,
              private obrazovanjeService: ObrazovanjeService,
              private sektorService: SektorService
              ) { }

  ngOnInit(): void {
    this.obrazovanjeService.getAllObrazovanja().subscribe(obrazovanja => {
      this.obrazovanja = obrazovanja;
    });
    this.sektorService.getAllSektori().subscribe(sektori => {
      this.sektori = sektori;
    })
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void {
    this.radnikService.addRadnik(this.data);
    this.snackBar.open('Uspešno dodat radnik '+this.data.ime+' '+this.data.prezime, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data, this.data.id);
    this.snackBar.open('Uspešno modifikovan radnik '+this.data.ime+' '+this.data.prezime, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id);
    this.snackBar.open('Uspešno obrisan radnik '+this.data.ime+' '+this.data.prezime, 'U redu', {
      duration: 2500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {
      duration: 500
    });
  }

}
