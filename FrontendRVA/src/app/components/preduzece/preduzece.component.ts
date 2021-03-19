import { PreduzeceDijalogComponent } from './../dialogs/preduzece-dijalog/preduzece-dijalog.component';
import { PreduzeceService } from './../../services/preduzece.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Preduzece } from 'src/app/models/preduzece';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'pib', 'opis', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Preduzece>;
  selektovanoPreduzece: Preduzece;

  @ViewChild (MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild (MatSort, {static:false}) sort: MatSort;


  constructor(private preduzeceService: PreduzeceService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.preduzeceService.getAllPreduzeca().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRow(row: any){
    this.selektovanoPreduzece = row;
   }


  public openDialog(flag: number, id?:number, naziv?: string, pib?: number, sediste?:string, opis?:string){
    const dialogRef = this.dialog.open(PreduzeceDijalogComponent, {
    data: {id, naziv, pib, sediste, opis}
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        if(flag == 3){
          this.selektovanoPreduzece = null;
        }
        this.loadData();
      }
    });
    }

}
