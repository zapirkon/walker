import { Step } from "./step";

export class Crossroad {
  constructor(
    readonly current: Step,
    readonly direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT',
    readonly up: Step,
    readonly down: Step,
    readonly left: Step,
    readonly right: Step,
  ) { }

  step() {
    return this.direction;
  }
}
