import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { getAllCompaniesResolver } from './companies.resolver';
import { CompaniesDataProviderService, Company } from './companies.data-provider.service';

const CompaniesDataProviderServiceMock = {
  list: jest.fn(),
  filterById: jest.fn()
};

describe('companiesResolver', () => {
  const executeResolver: ResolveFn<Company[]> = (...resolverParameters) => TestBed.runInInjectionContext(() => getAllCompaniesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CompaniesDataProviderService, useValue: CompaniesDataProviderServiceMock }]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return a list of companies', () => {
    CompaniesDataProviderServiceMock.list.mockReturnValue([{ name: 'mockedCompany' }]);

    const list = executeResolver({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Company[];

    expect(CompaniesDataProviderServiceMock.list).toHaveBeenCalled();
    expect(list[0].name).toEqual('mockedCompany');
  });
});
