import { Component, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected hide = signal(true);
  protected clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  protected form = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private readonly _fb: FormBuilder, private readonly _http: HttpClient, private readonly _router: Router) { }

  protected login() {
    this._http.post('http://localhost:3000/api/authentication/login', this.form.value, {
      withCredentials: true
    }).subscribe(async () => {
      await this._router.navigate(['/']);
    });
  }
}
