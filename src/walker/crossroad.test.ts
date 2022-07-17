import { Crossroad, Direction } from "./crossroad";
import { Step, StepType } from "./step";

describe('Crossroads', () => {

  const makeChoices = (up: string, down: string, left: string, right: string)
    : Record<Direction, Step> => ({
      UP: new Step(up),
      DOWN: new Step(down),
      LEFT: new Step(left),
      RIGHT: new Step(right),
    });

  describe('valid crossroads', () => {
    it('start must have one choice for any start direction', () => {
      const crossroad = new Crossroad(
        new Step(StepType.START),
        Direction.RIGHT,
        makeChoices('x', '', '', '')
      );
      expect(crossroad.move()).toStrictEqual(Direction.UP);
    });

    it('continue in same direction', () => {
      const crossroad = new Crossroad(
        new Step('-'),
        Direction.RIGHT,
        makeChoices('', '', '', '-')
      );
      expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
    });

    describe('simple turn', () => {
      it('up', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.LEFT,
          makeChoices('U', '', '', '-')
        );
        expect(crossroad.move()).toStrictEqual(Direction.UP);
      });

      it('down', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.RIGHT,
          makeChoices('', 'D', '', '-')
        );
        expect(crossroad.move()).toStrictEqual(Direction.DOWN);
      });

      it('left', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.UP,
          makeChoices('|', '|', 'L', '')
        );
        expect(crossroad.move()).toStrictEqual(Direction.LEFT);
      });

      it('right', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.DOWN,
          makeChoices('|', '|', '', 'R')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });
    });

    describe('cross bridges', () => {
      it('up', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.LEFT,
          makeChoices('-', '', '', '-')
        );
        expect(crossroad.move()).toStrictEqual(Direction.UP);
      });

      it('down', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.RIGHT,
          makeChoices('', '-', '', '-')
        );
        expect(crossroad.move()).toStrictEqual(Direction.DOWN);
      });

      it('left', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.UP,
          makeChoices('|', '|', '|', '')
        );
        expect(crossroad.move()).toStrictEqual(Direction.LEFT);
      });

      it('right', () => {
        const crossroad = new Crossroad(
          new Step('+'),
          Direction.DOWN,
          makeChoices('|', '|', '', '|')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });
    });

    describe('letter choice', () => {
      it('continue to path', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices(' ', ' ', ' ', '-')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });

      it('continue to bridge', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices(' ', ' ', ' ', '|')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });

      it('continue to letter', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices(' ', ' ', ' ', 'R')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });

      it('continue when it can turn', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices('U', 'D', 'L', 'R')
        );
        expect(crossroad.move()).toStrictEqual(Direction.RIGHT);
      });

      it('turn', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices('U', ' ', 'L', '')
        );
        expect(crossroad.move()).toStrictEqual(Direction.UP);
      });

      it('turn to bridge', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices('-', ' ', 'L', '')
        );
        expect(crossroad.move()).toStrictEqual(Direction.UP);
      });

      it('stop on fork', () => {
        const crossroad = new Crossroad(
          new Step('A'),
          Direction.RIGHT,
          makeChoices('U', 'D', 'L', '')
        );
        expect(crossroad.move()).toStrictEqual(undefined);
      });
    });
  });

  describe('dead end', () => {

    it('stuck at start', () => {
      const crossroad = new Crossroad(
        new Step(StepType.START),
        Direction.RIGHT,
        makeChoices('U', 'D', 'L', 'R')
      );
      expect(crossroad.move()).toStrictEqual(undefined);
    });

    it('end was reached', () => {
      const crossroad = new Crossroad(
        new Step(StepType.END),
        Direction.RIGHT,
        makeChoices('', '', '@', 'R')
      );
      expect(crossroad.move()).toStrictEqual(undefined);
    });

    test('nothing ahead', () => {
      const crossroad = new Crossroad(
        new Step('N'),
        Direction.RIGHT,
        makeChoices('', '', '', '')
      );
      expect(crossroad.move()).toStrictEqual(undefined);
    });

    test('fork', () => {
      const crossroad = new Crossroad(
        new Step('+'),
        Direction.RIGHT,
        makeChoices('|', '|', '-', '-')
      );
      expect(crossroad.move()).toStrictEqual(undefined);
    });
  });

});
