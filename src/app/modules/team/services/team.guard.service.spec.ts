import { TestBed } from '@angular/core/testing';

import { Team.GuardService } from './team.guard.service';

describe('Team.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Team.GuardService = TestBed.get(Team.GuardService);
    expect(service).toBeTruthy();
  });
});
