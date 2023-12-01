import loadLines from '../../LoadLines.js'

const lines = loadLines('input.txt');
const numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"];

const result = lines.reduce((sum,line)=>{
  let matches = Array.from(line.matchAll(`(?=(${numbers.join("|")}|\\d))`)).map(m=>m[1].match(/\d/) ? m[1] : numbers.indexOf(m[1]) || m[1]);
  return sum += matches.at(0) * 10 + matches.at(-1) * 1;
}, 0)

console.log(result)

