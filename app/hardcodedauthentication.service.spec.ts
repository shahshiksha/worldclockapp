import { TestBed } from '@angular/core/testing';

import { HardcodedauthenticationService } from './hardcodedauthentication.service';

describe('HardcodedauthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HardcodedauthenticationService = TestBed.get(HardcodedauthenticationService);
    expect(service).toBeTruthy();
  });
});
