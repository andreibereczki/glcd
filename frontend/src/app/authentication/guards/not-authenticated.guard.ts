import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const notAuthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if(authenticationService.isAuthenticated()) {
    return router.parseUrl('/');
  }

  return true;
};
