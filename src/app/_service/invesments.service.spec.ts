import { TestBed } from '@angular/core/testing';

import { InvesmentsService } from './invesments.service';

describe('InvesmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvesmentsService = TestBed.get(InvesmentsService);
    expect(service).toBeTruthy();
  });
});
