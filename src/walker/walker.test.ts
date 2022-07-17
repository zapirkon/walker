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
});
