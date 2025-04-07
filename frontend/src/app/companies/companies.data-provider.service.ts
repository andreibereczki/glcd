import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Company {
  id: number;
  name: string;
  exchange: string;
  ticker: string;
  isin: string;
  website: string | null;
}

@Injectable()
export class CompaniesDataProviderService {
  private readonly _http = inject(HttpClient);

  public list() {
    return this._http.get<Company[]>('http://localhost:3000/api/companies', { withCredentials: true });
  }
}
