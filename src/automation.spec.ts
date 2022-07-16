import { Walker } from './walker';

describe('automated tests', () => {
  it('walker walks a good path', () => {
    const walker = new Walker([['hello'], ['path']]);
    const result = walker.walk();
    expect(result)
      .toStrictEqual({
        path: '',
        letters: '',
      });
  });

  it('walker does not take the bad road', () => {
    const walker = new Walker([]);
    const result = walker.walk();
    expect(result)
      .toStrictEqual({
        error: 'Error',
      });
  });
});
