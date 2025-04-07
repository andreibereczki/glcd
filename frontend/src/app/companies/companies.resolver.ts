import { ResolveFn } from '@angular/router';
import { CompaniesDataProviderService, Company } from './companies.data-provider.service';
import { inject } from '@angular/core';

export const companiesResolver: ResolveFn<Company[]> = () => {
  const provider = inject(CompaniesDataProviderService);

  return provider.list();
};
