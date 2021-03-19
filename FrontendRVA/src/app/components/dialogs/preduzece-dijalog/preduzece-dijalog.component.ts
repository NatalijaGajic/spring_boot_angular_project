import { PreduzeceService } from './../../../services/preduzece.service';
import { PreduzeceComponent } from './../../preduzece/preduzece.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preduzece-dijalog',
  templateUrl: './preduzece-dijalog.component.html',
  styleUrls: ['./preduzece-dijalog.component.css']
})
export class PreduzeceDijalogComponent implements OnInit {

  public flag: number;
  constructor(public preduzeceService: PreduzeceService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Preduzece>,
              @Inject (MAT_DIALOG_DATA) public data: Preduzece) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.preduzeceService.addPreduzece(this.data);
    this.snackBar.open('Uspešno dodato preduzeće '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.preduzeceService.updatePreduzece(this.data, this.data.id);
    this.snackBar.open('Uspešno modifikovano preduzeće '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id);
    this.snackBar.open('Uspešno obrisano preduzeće '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
  }

}
