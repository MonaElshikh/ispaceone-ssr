import { onCreateDirective } from 'Shared/Directives/onCreate.directive';

describe('onCreateDirective', () => {
  it('should create an instance', () => {
    const directive = new onCreateDirective();
    expect(directive).toBeTruthy();
  });
});
