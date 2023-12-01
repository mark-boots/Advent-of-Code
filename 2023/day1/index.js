import loadLines from '../../LoadLines.js'

const lines = loadLines('input.txt');
const numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"];
const result = lines.reduce((sum,line)=>{
  let matches = Array.from(line.matchAll(`(?=(${numbers.join("|")}|\\d))`)).map(m=>m[1]);
  let first = matches.at(0);
  let last = matches.at(-1);
  first = first.match(/\d/) ? first : numbers.indexOf(first);
  last = last.match(/\d/) ? last : numbers.indexOf(last);
  return sum += first * 10 + last * 1;
}, 0)

console.log(result)

