import { TestBed } from '@angular/core/testing';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
describe('AdminSettingsService', () => {
  let service: LimitsAndUpgradeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitsAndUpgradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
