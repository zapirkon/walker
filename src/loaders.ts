import { Step } from "./step";

export function loadMap(map: string[]) {
  return [[new Step(map[0][0]), new Step(map[0][1])]];
}
