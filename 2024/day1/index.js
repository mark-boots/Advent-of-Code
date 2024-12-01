import loadLines from '../../LoadLines.js';

const [left, right] = 
  loadLines("input.txt")
    .reduce((arr, line)=>{
      const [l, r] = line.match(/\d+/g).map(Number)
      arr[0].push(l);
      arr[1].push(r);
      return arr;
    },[[],[]])

// part 1
const [lsort, rsort] = [[...left],[...right]].map(v => v.sort((a,b) => a-b));
const result1 = lsort.reduce((sum, val, idx) => {
  return sum + Math.abs(val - rsort[idx]);
}, 0)
console.log(result1) // 2430334

// part 2
const result2 = left.reduce((sum, val) => {
  return sum + val * right.filter(v => v == val).length;
}, 0)
console.log(result2) // 28786472