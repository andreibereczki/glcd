import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { catchError, of } from 'rxjs';

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
  private readonly _authenticationService = inject(AuthenticationService);

  public list() {
    return this._http.get<Company[]>('http://localhost:3000/api/companies', { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authenticationService.logout();
        }

        return of([] as Company[]);
      })
    );
  }

  public filterById(id: string) {
    return this._http.get<Company>(`http://localhost:3000/api/companies/id/${id}`, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authenticationService.logout();
        }
        return of({} as Company);
      })
    );
  }

  public filterByIsin(isin: string) {
    return this._http.get<Company>(`http://localhost:3000/api/companies/isin/${isin}`, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authenticationService.logout();
        }
        return of({} as Company);
      })
    );
  }

  public create(company: Company) {
    return this._http.post('http://localhost:3000/api/companies', company, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authenticationService.logout();
        }
        return of({} as Company);
      })
    );
  }

  public update(company: Company) {
    const companyWithoutId = { ...company };
    delete companyWithoutId.id;

    return this._http.put(`http://localhost:3000/api/companies/${company.id}`, companyWithoutId, { withCredentials: true }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._authenticationService.logout();
        }
        return of({} as Company);
      })
    );
  }
}
