import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authenticatedGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  return http
    .get('http://localhost:3000/api/authentication/verify', {
      withCredentials: true
    })
    .pipe(
      map(() => {
        authenticationService.hasAuthenticated();
        return true;
      }),
      catchError(() => of(router.parseUrl('login')))
    );
};
