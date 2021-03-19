import { PreduzeceService } from './../../../services/preduzece.service';
import { SektorService } from './../../../services/sektor.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sektor } from 'src/app/models/sektor';
import { Preduzece } from 'src/app/models/preduzece';

@Component({
  selector: 'app-sektor-dijalog',
  templateUrl: './sektor-dijalog.component.html',
  styleUrls: ['./sektor-dijalog.component.css']
})
export class SektorDijalogComponent implements OnInit {

  preduzeca: Preduzece[];

  public flag: number;
  constructor(public sektorService: SektorService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Sektor>,
              @Inject (MAT_DIALOG_DATA) public data: Sektor,
              private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.preduzeceService.getAllPreduzeca().subscribe(preduzeca => {
      this.preduzeca = preduzeca;
    });
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void{
    this.sektorService.addSektor(this.data);
    this.snackBar.open('Uspešno dodat sektor '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.sektorService.updateSektor(this.data, this.data.id);
    this.snackBar.open('Uspešno modifikovan sektor '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    console.log(this.data);
    console.log(this.data.id);
    this.sektorService.deleteSektor(this.data.id);
    this.snackBar.open('Uspešno obrisan sektor '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
  }

}
