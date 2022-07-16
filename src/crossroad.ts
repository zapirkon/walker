import { Step } from "./step";

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
    return this.choices[this.direction];
  }
}
