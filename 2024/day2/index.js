// https://adventofcode.com/2024/day/2
import loadLines from '../../LoadLines.js';

// load + prepare
const reports = loadLines("input.txt").map(line => line.split(" ").map(Number));

const solution = { part1: 0, part2: 0 };

solution.part1 = reports.filter(isSafeReport).length
solution.part2 = reports.filter(report => {
  for(let l = 0; l < report.length; l++){
    if(isSafeReport(report.filter((_, i) => i !== l))) return true
  }
  return false
}).length

console.log(solution) //{ part1: 257, part2: 328 }

function isSafeReport(report){
  if(report.slice(1).every((level, idx) => level - report[idx] <= 3 && level - report[idx] >= 1 )) return true
  if(report.slice(1).every((level, idx) => report[idx] - level <= 3 && report[idx] - level >= 1 )) return true
  return false
}