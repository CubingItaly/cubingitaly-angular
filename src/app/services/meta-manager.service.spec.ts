import { TestBed } from '@angular/core/testing';

import { MetaManagerService } from './meta-manager.service';

describe('MetaManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaManagerService = TestBed.get(MetaManagerService);
    expect(service).toBeTruthy();
  });
});
