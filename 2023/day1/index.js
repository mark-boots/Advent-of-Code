import loadLines from '../../LoadLines.js'

const lines = loadLines('input.txt');
const nums = ['zero','one','two','three','four','five','six','seven','eight','nine','\\d'];

const result = lines.reduce((sum,line)=>{
  const matches = Array.from(line.matchAll(`(?=(${nums.join("|")}))`)).map(m=>m[1].match(/\d/) ? m[1] : nums.indexOf(m[1]) || m[1]);
  return sum += matches.at(0) * 10 + matches.at(-1) * 1;
}, 0)

console.log(result);