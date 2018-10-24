import { TestBed } from '@angular/core/testing';

import { TutorialGuardService } from './tutorial-guard.service';

describe('TutorialGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutorialGuardService = TestBed.get(TutorialGuardService);
    expect(service).toBeTruthy();
  });
});
