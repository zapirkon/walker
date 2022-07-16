import { Crossroad } from "./crossroad";
import { Step } from "./step";

describe('Crossroads', () => {
  test('valid crossroad', () => {
    expect(true).toBe(true);
  });

  test('not a crossroad', () => {
    expect(false).toBe(false);
  });

  describe('crossing the road', () => {
    it('continue in same direction', () => {
      const step = new Step('-');
      const direction = 'RIGHT';
      const expected = new Step('-');
      const crossroad = new Crossroad(
        step,
        direction,
        new Step(''), new Step(''), new Step(''), expected);
      const move = crossroad.step();
      expect(move).toStrictEqual(direction);
    });
  });
});
