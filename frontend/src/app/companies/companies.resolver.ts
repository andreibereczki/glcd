import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CompaniesDataProviderService, Company } from './companies.data-provider.service';

export const getAllCompaniesResolver: ResolveFn<Company[]> = () => {
  const provider = inject(CompaniesDataProviderService);

  return provider.list();
};

export const getCompanyById: ResolveFn<Company> = (route: ActivatedRouteSnapshot) => {
  const provider = inject(CompaniesDataProviderService);

  return provider.filterById(route.params['id'] as string);
};
