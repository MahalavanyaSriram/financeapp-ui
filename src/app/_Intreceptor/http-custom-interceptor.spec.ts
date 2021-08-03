import { TestBed } from '@angular/core/testing';

import { HttpCustomInterceptor } from './http-custom-interceptor';

describe('HttpCustomInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCustomInterceptor = TestBed.get(HttpCustomInterceptor);
    expect(service).toBeTruthy();
  });
});
