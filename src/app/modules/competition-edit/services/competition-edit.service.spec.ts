import { TestBed } from '@angular/core/testing';

import { CompetitionEditService } from './competition-edit.service';

describe('CompetitionEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetitionEditService = TestBed.get(CompetitionEditService);
    expect(service).toBeTruthy();
  });
});
