import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObrazovanjeService } from './../../../services/obrazovanje.service';
import { Obrazovanje } from './../../../models/obrazovanje';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-obrazovanje-dijalog',
  templateUrl: './obrazovanje-dijalog.component.html',
  styleUrls: ['./obrazovanje-dijalog.component.css']
})
export class ObrazovanjeDijalogComponent implements OnInit {

  public flag: number;
  constructor(public obrazovanjeService: ObrazovanjeService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<Obrazovanje>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open('Uspešno dodato obrazovanje '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.obrazovanjeService.updateObrazovanje(this.data, this.data.id);
    this.snackBar.open('Uspešno modifikovano obrazovanje '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open('Uspešno obrisano obrazovanje '+this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
  }

}
