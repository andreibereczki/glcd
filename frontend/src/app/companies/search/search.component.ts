import { Component, inject, output } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

export enum SearchDataCriteriaBy {
  ID = 'id',
  ISIN = 'isin'
}

export interface SearchData {
  keyword: string;
  by: SearchDataCriteriaBy;
}

@Component({
  selector: 'app-search',
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatButton],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private readonly _fb = inject(FormBuilder);

  protected readonly form = this._fb.group({
    // eslint-disable-next-line @typescript-eslint/unbound-method
    by: ['', Validators.required],
    // eslint-disable-next-line @typescript-eslint/unbound-method
    keyword: ['', Validators.required]
  });
  protected isSearchCleared = true;

  public searchCriteria = output<SearchData | null>();

  protected clearSearch(event: MouseEvent) {
    this.isSearchCleared = true;
    this.searchCriteria.emit(null);

    event.preventDefault();
    event.stopPropagation();
  }

  public sendFilterCriteriaToParent() {
    this.isSearchCleared = false;
    this.searchCriteria.emit(this.form.value as SearchData);
  }
}
