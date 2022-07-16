import { Step, StepType } from "./step";

export const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
type Direction = typeof Direction[keyof typeof Direction];

export class Crossroad {
  constructor(
    readonly current: Step,
    readonly direction: Direction,
    readonly choices: Record<Direction, Step>,
  ) { }

  move() {
    switch (this.current.type) {
      case StepType.HORIZONTAL:
      case StepType.VERTICAL:
        return this.continue();

      case StepType.TURN:
        return this.turn();

      case StepType.LETTER:
        return this.continue() || this.turn();
    }
  }

  continue() {
    return this.choices[this.direction];
  }

  turn() {
    switch (this.direction) {
      case Direction.UP:
      case Direction.DOWN:
        if (this.choices.LEFT.canStepOn && this.choices.RIGHT.canStepOn)
          return undefined;
        if (this.choices.LEFT.canStepOn) return this.choices.LEFT;
        if (this.choices.RIGHT.canStepOn) return this.choices.RIGHT;
        break;

      case Direction.LEFT:
      case Direction.RIGHT:
        if (this.choices.UP.canStepOn && this.choices.DOWN.canStepOn)
          return undefined;
        if (this.choices.UP.canStepOn) return this.choices.UP;
        if (this.choices.DOWN.canStepOn) return this.choices.DOWN;
        break;
    }
  }
}
