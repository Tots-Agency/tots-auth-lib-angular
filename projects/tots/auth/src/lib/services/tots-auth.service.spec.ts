import { TestBed } from '@angular/core/testing';

import { TotsAuthService } from './tots-auth.service';

describe('TotsAuthService', () => {
  let service: TotsAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotsAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
