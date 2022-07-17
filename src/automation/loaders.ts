import { readFileSync } from 'fs';
import { Step } from "../walker/step";
import { isSolution, MapResult } from '../walker/walker';

export function loadMap(map: string[]) {
  return map.map(row => [...row].map(step => new Step(step)));
}

export function loadSolutions(path: string) {
  const input = readFileSync(path, 'utf-8').split(/\r?\n/)
    .map(p => !p.trim() || p.startsWith('### ')
      ? undefined // filter empty lines and other markup
      : p === '```' ? '$' // mark the solutions
        : p.startsWith("#### ") ? "####" : p) // clear the titles
    .join('\r\n').split('####'); // groups of solutions by title
  const solutions: { map: Step[][], expected: string; }[] = [];
  input.forEach(item => {
    const maps: Step[][][] = [];
    let expected = '';
    item.split('$').forEach(something => {
      const validItem = something.trim();
      if (validItem) {
        expected = validItem;
        maps.push(loadMap(something.split(/\r?\n/))); // split but no trim
      };
    });
    maps.pop(); // the last item added was the trimmed expected solution
    maps.forEach(map => solutions.push({ map, expected }));
  });
  return solutions;
}

export function expectedResult(result: MapResult) {
  if (isSolution(result)) {
    return [
      `Expected result: `,
      `- Letters \`\`\`${result.letters}\`\`\``,
      `- Path as characters \`\`\`${result.path}\`\`\``
    ].join('\r\n');
  }
  return `Expected result: ${result.error}`;
}
