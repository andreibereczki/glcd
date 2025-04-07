import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getAllCompaniesResolver } from './companies.resolver';
import { Company } from './companies.data-provider.service';

describe('companiesResolver', () => {
  const executeResolver: ResolveFn<Company[]> = (...resolverParameters) => TestBed.runInInjectionContext(() => getAllCompaniesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
