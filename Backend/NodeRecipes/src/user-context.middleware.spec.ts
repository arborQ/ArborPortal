import { UserContextMiddleware } from './user-context.middleware';

describe('UserContextMiddleware', () => {
  it('should be defined', () => {
    expect(new UserContextMiddleware()).toBeDefined();
  });
});
