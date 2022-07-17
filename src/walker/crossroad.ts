import { Step, StepType } from "./step";

export const Direction = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

export class Crossroad {
  constructor(
    private readonly current: Step,
    private readonly direction: Direction | undefined,
    private readonly choices: Record<Direction, Step>,
  ) { }

  move() {
    switch (this.current.type) {
      case StepType.START:
        return this.start();

      case StepType.HORIZONTAL:
      case StepType.VERTICAL:
        return this.continue();

      case StepType.TURN:
        return this.turn();

      case StepType.LETTER:
        return this.continue() || this.turn();
    }
  }

  private start() {
    const directions = Object.entries(this.choices)
      .map(n => n[1]?.canStepOn ? n[0] as Direction : undefined)
      .filter(Boolean);
    if (directions.length === 1) {
      return directions[0];
    }
  }

  private continue() {
    if (this.direction && this.choices[this.direction].canStepOn) {
      return this.direction;
    }
  }

  private turn() {
    switch (this.direction) {
      case Direction.UP:
      case Direction.DOWN:
        if (this.choices.LEFT.canStepOn !== this.choices.RIGHT.canStepOn) {
          if (this.choices.LEFT.canStepOn) return Direction.LEFT;
          if (this.choices.RIGHT.canStepOn) return Direction.RIGHT;
        }
      case Direction.LEFT:
      case Direction.RIGHT:
        if (this.choices.UP.canStepOn !== this.choices.DOWN.canStepOn) {
          if (this.choices.UP.canStepOn) return Direction.UP;
          if (this.choices.DOWN.canStepOn) return Direction.DOWN;
        }
    }
  }
}
