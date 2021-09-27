import { TestBed } from '@angular/core/testing';

import { MyArticlesCommentsService } from './my-articles-comments.service';

describe('MyArticlesCommentsService', () => {
  let service: MyArticlesCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyArticlesCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
