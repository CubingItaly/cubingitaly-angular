import { TestBed } from '@angular/core/testing';

import { CompEditGuardService } from './comp-edit-guard.service';

describe('CompEditGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompEditGuardService = TestBed.get(CompEditGuardService);
    expect(service).toBeTruthy();
  });
});
