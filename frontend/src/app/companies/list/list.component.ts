import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CompaniesDataProviderService, Company } from '../companies.data-provider.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { SearchComponent, SearchData, SearchDataCriteriaBy } from '../search/search.component';
import { take } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
    SearchComponent,
    MatButton,
    MatIcon,
    RouterLink
  ],
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {
  protected readonly _activatedRoute = inject(ActivatedRoute);
  protected readonly _router = inject(Router);
  protected readonly _dataProvider = inject(CompaniesDataProviderService);

  protected pageTitle: string | undefined;
  protected list: MatTableDataSource<Company> = new MatTableDataSource();
  protected displayedColumns: string[] = ['id', 'name', 'exchange', 'ticker', 'isin', 'website'];

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  public ngOnInit() {
    this.setDataFromRouteResolver();
  }

  protected setDataFromRouteResolver() {
    this._activatedRoute.data.pipe(take(1)).subscribe((data) => {
      this.pageTitle = data[Object.getOwnPropertySymbols(data)[0]];
      this.list.data = data['companies'];
    });
  }

  public ngAfterViewInit() {
    this.list.sort = this.sort;
  }

  public updateFilterCriteria(searchData: SearchData | null) {
    if (searchData === null) {
      this.setDataFromRouteResolver();
      return;
    }

    let filterByFunction: typeof this._dataProvider.filterById | typeof this._dataProvider.filterByIsin;

    switch (searchData.by) {
      case SearchDataCriteriaBy.ID:
        filterByFunction = this._dataProvider.filterById.bind(this._dataProvider);
        break;

      case SearchDataCriteriaBy.ISIN:
        filterByFunction = this._dataProvider.filterByIsin.bind(this._dataProvider);
        break;
    }

    filterByFunction(searchData.keyword).subscribe(company => {
      this.list.data = [company];
    });
  }

  public async edit(id: string) {
    await this._router.navigate(['..', 'edit', id], {relativeTo: this._activatedRoute });
  }
}
