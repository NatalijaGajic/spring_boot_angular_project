import { ObrazovanjeService } from './../../services/obrazovanje.service';
import { RadnikService } from './../../services/radnik.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from 'src/app/models/radnik';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Sektor } from 'src/app/models/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { MatDialog } from '@angular/material/dialog';
import { RadnikDijalogComponent } from '../dialogs/radnik-dijalog/radnik-dijalog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  //OnInit - life cycle hook
  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];
  dataSource: MatTableDataSource<Radnik>;

  //da bismo koristili kreirane direkrive
  @ViewChild (MatPaginator, {static:false}) paginator: MatPaginator;
  @ViewChild (MatSort, {static:false}) sort: MatSort;


  constructor(private radnikService: RadnikService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.radnikService.getAllRadnici().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

     // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

     // sortiranje po nazivu ugnježdenog objekta
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
        default: return data[property];
      }
    };

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return ((key === 'sektor' ? currentTerm + data.sektor.naziv : currentTerm + data[key])
          || ( key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key]));
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

         // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'sektor': return data.sektor.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: string,
                    obrazovanje?: Obrazovanje, sektor?: Sektor){
    const dialogRef = this.dialog.open(RadnikDijalogComponent, {
      data: {id, ime, prezime, brojLk, obrazovanje, sektor}
    });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        this.loadData();
      }
    });
  }

}
