import { TestBed } from '@angular/core/testing';

import { MyArticlesTrakingService } from './my-articles-traking.service';

describe('MyArticlesTrakingService', () => {
  let service: MyArticlesTrakingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyArticlesTrakingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
