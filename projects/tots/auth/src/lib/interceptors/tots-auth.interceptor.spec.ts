import { TestBed } from '@angular/core/testing';

import { TotsAuthInterceptor } from './tots-auth.interceptor';

describe('TotsAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TotsAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TotsAuthInterceptor = TestBed.inject(TotsAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
