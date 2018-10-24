import { TestBed } from '@angular/core/testing';

import { ArticleGuardService } from './article-guard.service';

describe('ArticleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleGuardService = TestBed.get(ArticleGuardService);
    expect(service).toBeTruthy();
  });
});
