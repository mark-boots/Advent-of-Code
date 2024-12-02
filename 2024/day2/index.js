// load + prepare
import loadLines from '../../LoadLines.js';
const reports = loadLines("input.txt").map(line => line.split(" ").map(Number));

// part 1 + 2
const solution = { part1: 0, part2: 0 };

solution.part1 = reports.filter(isSafeReport).length
solution.part2 = reports.filter(report => {
  for(let l = 0; l < report.length; l++){
    if(isSafeReport(report.filter((_, i) => i !== l))) return true
  }
  return false
}).length

console.log(solution) //{ part1: 257, part2: 328 }

function isSafeReport(report) {
  const diff = report.slice(1).map((level, idx) => level - report[idx]);
  return diff.every(d => d >= 1 && d <= 3) || diff.every(d => d <= -1 && d >= -3);
}