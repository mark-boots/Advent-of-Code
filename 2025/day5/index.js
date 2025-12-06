import loadLines from '../../LoadLines.js';

console.time("parse");
const lines = loadLines("input.txt");
const ranges = lines.slice(0, lines.indexOf("")).map(l => l.split("-").map(Number));
const ids = lines.slice(lines.indexOf("") + 1).map(Number);
console.timeEnd("parse");

console.time("part1");
console.log({part1: part1()});
console.timeEnd("part1");

console.time("part2");
console.log({part2: part2()});
console.timeEnd("part2");

function part1() {
  return ids.reduce(
    (total, id) => total + (ranges.find(([start, end]) => id >= start && id <= end) ? 1 : 0),
    0
  );
}

function part2() {
  const merged = [];
  for (let [start, end] of ranges) {
    let i = merged.findIndex(([_, mEnd]) => mEnd >= start - 1);
    if (i === -1) merged.push([start, end]);
    else {
      while (i < merged.length && merged[i][0] <= end + 1) {
        const [mStart, mEnd] = merged[i];
        if (mStart < start) start = mStart;
        if (mEnd > end) end = mEnd;
        merged.splice(i, 1);
      }
      merged.splice(i, 0, [start, end]);
    }
  }
  return merged.reduce((total, [start, end]) => total + end - start + 1, 0);
}