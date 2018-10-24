import { TestBed } from '@angular/core/testing';

import { TitleManagerService } from './title-manager.service';

describe('TitleManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleManagerService = TestBed.get(TitleManagerService);
    expect(service).toBeTruthy();
  });
});
