import loadLines from '../../LoadLines.js'

// const lines = loadLines('example.txt');
const lines = loadLines('input.txt');
const nums = ['\\d','one','two','three','four','five','six','seven','eight','nine'];

const result = lines.reduce((sum,line)=>{
  const matches = Array.from(line.matchAll(`(?=(${nums.join("|")}))`))
  .map(m=> /\d/.test(m[1]) ? m[1] : nums.indexOf(m[1]));
  return sum += matches.at(0) * 10 + matches.at(-1) * 1;
}, 0)

console.log(result);