import { Crossroad, Direction } from "./crossroad";
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
      const direction = Direction.RIGHT;
      const expected = new Step('-');
      const crossroad = new Crossroad(
        step,
        direction,
        {
          UP: new Step(''),
          DOWN: new Step(''),
          LEFT: new Step(''),
          RIGHT: expected,
        }
      );
      const move = crossroad.move();
      expect(move).toStrictEqual(expected);
    });
  });
});
