import loadLines from '../../LoadLines.js';

// parse
let [workflow, parts]= loadLines("example.txt").reduce((arr, line)=> (line == '' ? arr.push([]) : arr[arr.length-1].push(line), arr), [[]]);

workflow = workflow.reduce((obj, line) => {
    const [_, name, rules] = line.match(/(\w+)\{(.+)\}/);
    obj[name] = rules.split(",").map( r => {
        let [ rule, target ] = [false, ...r.split(":")].slice(-2);
        return { rule , target }
    })
    return obj
},{});

parts = parts.map(part => {
    return part.slice(1,-1).split(",").reduce((obj,v) => {
        const [name, number] = v.split("=");
        obj[name] = Number(number);
        return obj;
    },{});
});

// part 1
const part1 = parts.reduce((sum, part) => sum + wf("in", part), 0)
console.log({part1});

function wf(key, part) {
    for(let {rule, target} of workflow[key]){
        if(!rule || eval(rule.replace(rule[0], part[rule[0]]))){
            if(target == 'A') return Object.values(part).reduce((a,b)=>a+b, 0);
            else if(target !=='R') return wf(target, part);
            break;
        }
    }
    return 0;
}


import fs from 'fs'

const workflowsInput = fs.readFileSync('input.txt', 'utf-8').split('\n\n');
console.log(workflowsInput)
const workflows = { "A": ["A"], "R": ["R"] };

workflowsInput.map(w => {
  const [, name, rules] = w.match(/(.+){(.+)}/);
  workflows[name] = rules.split(',');
});


function solve(list, ranges) {
    console.log(list)
  const [current, ...rest] = list;

  if (current === 'A') {
    return ranges.map(r => r.length).reduce((acc, curr) => acc * curr);
  }

  if (current === 'R') {
    return 0;
  }

  if (!current.includes(':')) {
    return solve(workflows[current], ranges);
  }

  const [, attr, comp, value, target] = current.match(/(.)([<>])(\d+):(.*)/);
  const ix = "xmas".indexOf(attr);
  const numValue = parseInt(value, 10);
  const lower = comp === '<';

  const [r, cr, rr] = [ranges[ix], [...ranges], [...ranges]];
  cr[ix] = lower ? { start: r.start, end: value - 1 } : { start: value + 1, end: r.end };
  rr[ix] = lower ? { start: value, end: r.end } : { start: r.start, end: value };

  return solve(workflows[target], cr) + solve(rest, rr);
}

console.log(solve(workflows['in'], Array(4).fill({ start: 1, end: 4000 })));
