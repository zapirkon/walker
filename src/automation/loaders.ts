import { Step } from "../walker/step";

export function loadMap(map: string[]) {
  return map.map(row => [...row].map(step => new Step(step)));
}
