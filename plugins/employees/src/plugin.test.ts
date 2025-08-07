import { employeesPlugin } from './plugin';

describe('employees', () => {
  it('should export plugin', () => {
    expect(employeesPlugin).toBeDefined();
  });
});
