import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { from, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public hasAuthenticated() {
    localStorage.setItem('authenticated', 'true');
  }

  public isAuthenticated() {
    return Boolean(localStorage.getItem('authenticated') ?? false);
  }

  public logout() {
    this._http.get('http://localhost:3000/api/authentication/logout', { withCredentials: true }).pipe(
      tap(() => localStorage.removeItem('authenticated')),
      switchMap(() => from(this._router.navigate(['/login'], { relativeTo: this._activatedRoute})))
    ).subscribe()
  }
}
