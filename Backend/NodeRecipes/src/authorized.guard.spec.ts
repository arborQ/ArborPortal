import { AuthorizedGuard } from './authorized.guard';

describe('AuthorizedGuard', () => {
  it('should be defined', () => {
    expect(new AuthorizedGuard()).toBeDefined();
  });
});
