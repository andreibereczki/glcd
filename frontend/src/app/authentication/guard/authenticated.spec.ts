import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticated } from './authenticated';

describe('authenticated guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authenticated(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
