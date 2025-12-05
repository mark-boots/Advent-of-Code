import loadLines from '../../LoadLines.js';

const lines = loadLines("input.txt");
const ranges = lines.slice(0, lines.indexOf("")).map(l => l.split("-").map(Number))
const ids = lines.slice(lines.indexOf("") + 1).map(Number);

console.log({
  part1: part1(),
  part2: part2(),
})
// part 1
function part1() {
  return ids.reduce((total, id) => total + (ranges.find(([start, end]) => id >= start && id <= end)? 1 : 0), 0)
}

//part2
function part2() {
  let merged = [];
  for (let [start, end] of ranges) {
    let i = merged.findIndex(([_,e]) => e >= start - 1);
    if (i === -1) merged.push([start, end]);
    else {
      while (i < merged.length && merged[i][0] <= end + 1) {
        if(merged[i][0] < start) start = merged[i][0];
        if(merged[i][1] > end) end = merged[i][1];
        merged.splice(i, 1);
      }
      merged.splice(i, 0, [start, end]);
    }
  }
  console.log(merged)
  return merged.reduce((total, [start, end]) => total + end - start + 1, 0);
}