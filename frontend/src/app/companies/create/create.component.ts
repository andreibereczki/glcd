/* eslint-disable @typescript-eslint/unbound-method */
import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesDataProviderService, Company } from '../companies.data-provider.service';
import { isinValidator } from '../isin.validator';

@Component({
  selector: 'app-create',
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatFormField, MatButton, MatError],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _dataSource = inject(CompaniesDataProviderService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly form = this._fb.group({
    name: ['', Validators.required],
    exchange: ['', Validators.required],
    ticker: ['', Validators.required],
    isin: ['', [Validators.required, isinValidator()]],
    // eslint-disable-next-line no-useless-escape
    website: ['', Validators.pattern(RegExp('^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\\-/]*)?$'))]
  });

  protected create() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._dataSource.create(this.form.getRawValue() as Company).subscribe(async () => {
      await this._router.navigate(['..', 'list'], { relativeTo: this._activatedRoute });
    });
  }

  protected showErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'Field is required. Please provide a value';
    }

    if (control.hasError('pattern')) {
      return 'Value must be a valid URL.';
    }

    if (control.hasError('isinInvalid')) {
      return 'Isin value must start with 2 letters and be 12 characters long';
    }

    return 'Unknown error. Please contact administrator.';
  }
}
