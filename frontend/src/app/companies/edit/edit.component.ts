/* eslint-disable @typescript-eslint/unbound-method */
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { take } from 'rxjs';
import { isinValidator } from '../isin.validator';
import { CompaniesDataProviderService, Company } from '../companies.data-provider.service';

@Component({
  selector: 'app-edit',
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatFormField, MatButton, MatError],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _dataSource = inject(CompaniesDataProviderService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly form = this._fb.group({
    id: [undefined, Validators.required],
    name: ['', Validators.required],
    exchange: ['', Validators.required],
    ticker: ['', Validators.required],
    isin: ['', [Validators.required, isinValidator()]],
    // eslint-disable-next-line no-useless-escape
    website: ['', Validators.pattern(RegExp('^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\\-/]*)?$'))]
  });

  protected pageTitle: string | undefined;

  public ngOnInit() {
    this._activatedRoute.data.pipe(take(1)).subscribe(data => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.pageTitle = data[Object.getOwnPropertySymbols(data)[0]];
      const company = data['company'] as Company;

      if (company != null) {
        Object.keys(company).forEach((key: string) => {
          this.form.get(key)?.setValue(company[key as keyof Company] ?? undefined);
        });
      }
    });
  }

  protected update() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._dataSource.update(this.form.getRawValue() as Company).subscribe(async () => {
      await this._router.navigate(['../..', 'list'], { relativeTo: this._activatedRoute });
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
