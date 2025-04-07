import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Company {
  id?: number;
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

  public filterById(id: string) {
    return this._http.get<Company>('http://localhost:3000/api/companies/id/' + id, { withCredentials: true });
  }

  public filterByIsin(isin: string) {
    return this._http.get<Company>('http://localhost:3000/api/companies/isin/' + isin, { withCredentials: true });
  }

  public create(company: Company) {
    return this._http.post('http://localhost:3000/api/companies', company, { withCredentials: true });
  }

  public update(company: Company) {
    const companyWithoutId = { ... company };
    delete companyWithoutId.id;

    return this._http.put(`http://localhost:3000/api/companies/${company.id}`, companyWithoutId, { withCredentials: true });
  }
}
