import { TestBed } from '@angular/core/testing';

import { WCAService } from './wca.service';

describe('WCAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WCAService = TestBed.get(WCAService);
    expect(service).toBeTruthy();
  });
});
