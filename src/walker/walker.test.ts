import { Step } from "./step";
import { Walker } from "./walker";

describe('Walker', () => {
  it('walks', () => {
    const walker = new Walker([[new Step('@'), new Step('x')]]);
    const path = walker.walk();
    expect(path).toStrictEqual({
      path: '@x',
      letters: ''
    });
  });

  it('confused', () => {
    const walker = new Walker([[new Step('@'), new Step('@')]]);
    const path = walker.walk();
    expect(path).toStrictEqual({
      error: 'Error'
    });
  });

  it('limbo', () => {
    const walker = new Walker([[new Step('@'), new Step('*')]]);
    const path = walker.walk();
    expect(path).toStrictEqual({
      error: 'Error'
    });
  });

  it('reads', () => {
    const walker = new Walker([[new Step('@'), new Step('A'), new Step('x')]]);
    const path = walker.walk();
    expect(path).toStrictEqual({
      path: '@Ax',
      letters: 'A'
    });
  });

  it('knows', () => {
    const walker = new Walker([
      [new Step('@'), new Step('-'), new Step('+')],
      [new Step(' '), new Step('B'), new Step('|')],
      [new Step('C'), new Step('x'), new Step('A'), new Step('+')],
      [new Step(' '), new Step(' '), new Step('+'), new Step('+')],
    ]);
    const path = walker.walk();
    expect(path).toStrictEqual({
      path: '@-+|A+++Ax',
      letters: 'A'
    });
  });
});
