import { Walker } from "./walker";

console.log("The illiterate walker stands still.");
const goodWalker = new Walker([['hello'], ['path']]);
console.log(goodWalker.walk());

console.log("But he is aware of the surroundings.");
const badWalker = new Walker([]);
console.log(badWalker.walk());
