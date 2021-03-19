import { ObrazovanjeDijalogComponent } from './../dialogs/obrazovanje-dijalog/obrazovanje-dijalog.component';
import { ObrazovanjeService } from './../../services/obrazovanje.service';
import { Obrazovanje } from './../../models/obrazovanje';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

    //OnInit - life cycle hook
    displayedColumns = ['id', 'naziv','stepenStrucneSpreme','opis', 'actions'];
    dataSource: MatTableDataSource<Obrazovanje>;

    //da bismo koristili kreirane direkrive
    @ViewChild (MatPaginator, {static:false}) paginator: MatPaginator;
    @ViewChild (MatSort, {static:false}) sort: MatSort;

  constructor(private obrazovanjeService: ObrazovanjeService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.obrazovanjeService.getAllObrazovanja().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id?: number, naziv?: string, stepenStrucneSpreme?:string, opis?: string){
    const dialogRef = this.dialog.open(ObrazovanjeDijalogComponent, {
      data: {id, naziv, stepenStrucneSpreme, opis}
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }
    });
  }

}
