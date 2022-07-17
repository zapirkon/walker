import { Step } from "../walker/step";

export function loadMap(map: string[]) {
  return [[new Step(map[0][0]), new Step(map[0][1])]];
}
