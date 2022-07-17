import { Crossroad, Direction } from "./crossroad";
import { Step, StepType } from "./step";

type Coordinates = [number, number];

export class Walker {
  constructor(private readonly map: Step[][]) { }

  walk() {
    // find a single starting point
    let [location, ...multiStart] = this.map.flatMap((row, r) => row
      .map((node, c) => node.type === StepType.START ? [r, c] : undefined)
      .filter((item): item is Coordinates => !!item)
    );
    if (!location || multiStart.length) {
      return { error: "Error" };
    }

    const walked = [location];
    let direction: Direction | undefined = undefined;
    let step: Step | undefined = this.stepOn(location);
    while (step) {
      direction = new Crossroad(step, direction, this.choices(location)).move();
      if (!direction) break;
      location = this.lookAt(location, direction);
      step = this.stepOn(location);
      walked.push(location);
    }

    if (walked.length > 1 && step && step.type === StepType.END) {
      return {
        path: this.getPath(walked),
        letters: this.collectLetters(walked),
      };
    }

    return { error: "Error" };
  }

  private getPath(path: Coordinates[]) {
    return path.map(location => {
      const step = this.stepOn(location);
      if (step) return step.value;
    }).join('');
  }

  private collectLetters(path: Coordinates[]) {
    const visited = new Set<string>();
    return path.map(location => {
      const step = this.stepOn(location);
      if (step) {
        const key = `${location[0]},${location[1]}`;
        if (
          step.type === StepType.LETTER &&
          !visited.has(key)
        ) {
          visited.add(key);
          return step.value;
        }
      }
    }).join('');
  }

  private stepOn([row, column]: Coordinates) {
    if (
      row >= 0 &&
      column >= 0 &&
      row < this.map.length &&
      column < this.map[row].length
    ) {
      return this.map[row][column];
    }
  }

  private lookAt(
    [row, column]: Coordinates,
    direction: Direction,
  ): Coordinates {
    switch (direction) {
      case Direction.UP: return [row - 1, column];
      case Direction.DOWN: return [row + 1, column];
      case Direction.LEFT: return [row, column - 1];
      case Direction.RIGHT: return [row, column + 1];
    }
  }

  private choices(location: Coordinates): Record<Direction, Step> {
    const blank: Step = new Step('');
    return Object.values(Direction).reduce((steps, direction) => ({
      ...steps,
      [direction]: this.stepOn(this.lookAt(location, direction)) ?? blank
    }), { UP: blank, DOWN: blank, LEFT: blank, RIGHT: blank, });
  }
}
