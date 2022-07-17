import { loadMap } from "./automation/loaders";
import { Walker } from "./walker/walker";

console.log("The walker can read a word by looking ahead.");

const path = loadMap(['@HELLOx']);
const walker = new Walker(path);
console.log(walker.walk().letters);
