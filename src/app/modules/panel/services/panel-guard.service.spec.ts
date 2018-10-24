import { TestBed } from '@angular/core/testing';

import { PanelGuardService } from './panel-guard.service';

describe('PanelGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanelGuardService = TestBed.get(PanelGuardService);
    expect(service).toBeTruthy();
  });
});
