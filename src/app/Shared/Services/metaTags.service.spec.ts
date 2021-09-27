import { TestBed } from '@angular/core/testing';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
describe('MetaTagslService', () => {
  let service: MetaTagslService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaTagslService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
