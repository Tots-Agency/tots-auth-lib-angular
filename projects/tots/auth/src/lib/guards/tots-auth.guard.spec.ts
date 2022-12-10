import { TestBed } from '@angular/core/testing';

import { TotsAuthGuard } from './tots-auth.guard';

describe('TotsAuthGuard', () => {
  let guard: TotsAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TotsAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
