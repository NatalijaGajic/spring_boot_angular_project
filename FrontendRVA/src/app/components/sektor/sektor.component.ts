import { SektorDijalogComponent } from './../dialogs/sektor-dijalog/sektor-dijalog.component';
import { SektorService } from './../../services/sektor.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Sektor } from 'src/app/models/sektor';
import { Preduzece } from 'src/app/models/preduzece';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {


  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor>;

  @Input() selektovanoPreduzece: Preduzece;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sektorService: SektorService,
              private dialog: MatDialog) { }

  ngOnChanges() {
    if (this.selektovanoPreduzece.id) {
      debugger;
      this.loadData();
    }
  }

  ngOnInit(): void {
  }

  public loadData() {
    this.sektorService.getSektoriByPreduzece(this.selektovanoPreduzece.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'preduzece': return data.preduzece.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  public openDialog(flag: number, id?:number, naziv?: string, oznaka?:string, preduzece?:Preduzece){
    const dialogRef = this.dialog.open(SektorDijalogComponent, {
    data: {id, naziv, oznaka, preduzece}
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }
    });
    }

}
