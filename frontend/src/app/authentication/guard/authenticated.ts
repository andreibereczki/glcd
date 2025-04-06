import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authenticated: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get('http://localhost:3000/api/authentication/verify').pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      return of(router.parseUrl('login'));
    })
  );
};
