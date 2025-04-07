import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Company } from '../companies.data-provider.service';
import { ActivatedRoute } from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    MatSortHeader,
  ],
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {
  protected readonly _activatedRoute = inject(ActivatedRoute);

  protected pageTitle: string | undefined;
  protected list: MatTableDataSource<Company> = new MatTableDataSource();
  protected displayedColumns: string[] = ['id', 'name', 'exchange', 'ticker', 'isin', 'website'];

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  public ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.pageTitle = data[Object.getOwnPropertySymbols(data)[0]];
      this.list.data = data['companies'];
    });
  }

  ngAfterViewInit() {
    this.list.sort = this.sort;
  }
}
