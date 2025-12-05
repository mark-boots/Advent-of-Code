import loadLines from '../../LoadLines.js';

const lines = loadLines("input.txt");
const ranges = lines.slice(0, lines.indexOf("")).map(l => l.split("-").map(Number))
const ids = lines.slice(lines.indexOf("") + 1).map(Number);

console.log({
  part1: part1(),
  part2: part2(),
})

function part1() {
  return ids.reduce((total, id) => total + (ranges.find(([start, end]) => id >= start && id <= end)? 1 : 0), 0)
}
function part2() {
  let merged = [];
  for (let [start, end] of ranges) {
    let i = merged.findIndex(([_,mEnd]) => mEnd >= start - 1); // find first index where merged end > range start
    if (i === -1) merged.push([start, end])  // no inbetween entries. insert end of array
    else {
      while (i < merged.length && merged[i][0] <= end + 1) { // if merged start < range end there is overlap
        const [mStart, mEnd] = merged[i];
        if(mStart < start) start = mStart; //extend left
        if(mEnd > end) end = mEnd //extend right
        merged.splice(i, 1); //remove old merged row, next row will get same index for while loop
      }
      //insert new merged start/end at that index.
      merged.splice(i, 0, [start, end]);  
    }
  }
  return merged.reduce((total, [start, end]) => total + end - start + 1, 0);
}