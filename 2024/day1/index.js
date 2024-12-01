import loadLines from '../../LoadLines.js';
const lines = loadLines("input.txt")

// prepare
const [left, right] = rows2cols(lines.map(l=>l.split(/\s+/g)))

// part 1 + 2
const solution = { part1: 0, part2: 0 };
for(let i = 0; i < left.length; i++){
  solution.part1 += Math.abs(smallest(left, i) - smallest(right, i));
  solution.part2 += left[i] * count(right, left[i]);
}
console.log(solution) // { part1: 2430334, part2: 28786472 }

// helper functions
function rows2cols(arr){
  return Array.from({ length: arr[0].length }, (_, col) => arr.map(row => row[col]));
}
function smallest(arr, nth = 0){
  return arr.sort((a, b) => a - b)[nth];
}
function count(arr, val){
  return arr.filter(v => v==val).length;
}