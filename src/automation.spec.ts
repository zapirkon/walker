import { loadMap } from './loaders';
import { Walker } from './walker';

describe('automated tests', () => {
  it('walker walks a good path', () => {
    const map = loadMap(['@x']);
    const walker = new Walker(map);
    const result = walker.walk();
    expect(result).toStrictEqual({
      path: '@x',
      letters: '',
    });
  });

  it('walker does find a path', () => {
    const map = loadMap(['@ ']);
    const walker = new Walker(map);
    const result = walker.walk();
    expect(result).toStrictEqual({
      error: 'Error',
    });
  });

  it('walker does not take the bad road', () => {
    const walker = new Walker([]);
    const result = walker.walk();
    expect(result).toStrictEqual({
      error: 'Error',
    });
  });
});
