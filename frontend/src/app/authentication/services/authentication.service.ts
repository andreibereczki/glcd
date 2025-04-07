import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public hasAuthenticated() {
    localStorage.setItem('authenticated', 'true');
  }

  public isAuthenticated() {
    return Boolean(localStorage.getItem('authenticated') ?? false);
  }
}
