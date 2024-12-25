// Load and prepare
import loadLines from '../../LoadLines.js';
const schematics = loadLines("input.txt", false).split("\r\n\r\n");
const [locks, keys] = schematics.reduce((a, sraw) => {
    const s = sraw.split("\r\n").map(c => c.split(""));
    const counts = s[0].map((_, ci) => s.reduce((c, r) => c + (r[ci] === '#' ? 1 : 0), 0));
    (s[0].includes('#') ? a[0] : a[1]).push(counts);
    return a;
  },
  [[], []]
);

console.log({
  part1: locks.reduce((c, l) => c + keys.filter(k => l.every((l, i) => l + k[i] <= 7)).length, 0)
})