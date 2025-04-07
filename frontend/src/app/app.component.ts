import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatAnchor } from '@angular/material/button';
import { AuthenticationService } from './authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, MatAnchor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly authenticationService = inject(AuthenticationService);
}
