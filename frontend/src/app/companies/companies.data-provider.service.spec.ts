import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CompaniesDataProviderService } from './companies.data-provider.service';

describe('CompaniesDataProviderService', () => {
  let service: CompaniesDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });
    service = TestBed.inject(CompaniesDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
