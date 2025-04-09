import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CompaniesDataProviderService } from './companies.data-provider.service';
import { provideHttpClient } from '@angular/common/http';

describe('CompaniesDataProviderService', () => {
  let service: CompaniesDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CompaniesDataProviderService]
    });
    service = TestBed.inject(CompaniesDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
