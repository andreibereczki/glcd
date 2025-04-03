import { Router, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly title = 'frontend';

  private readonly router = inject(Router);
}
