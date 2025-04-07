import { Component, inject } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CompaniesDataProviderService, Company } from '../companies.data-provider.service';

@Component({
  selector: 'app-create',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField,
    MatButton
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _dataSource = inject(CompaniesDataProviderService);

  protected readonly form = this._fb.group({
    name: ['', Validators.required],
    exchange: ['', Validators.required],
    ticker: ['', Validators.required],
    isin: ['', Validators.required],
    website: ['']
  });

  protected create() {
    this._dataSource.create(this.form.getRawValue() as Company).subscribe();
  }
}
