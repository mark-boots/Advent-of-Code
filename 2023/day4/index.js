import loadLines from '../../LoadLines.js';

const wins = loadLines('input.txt')
  .reduce((c,l)=>c=[...c,l.split(":")[1].split("|").map(n=>n.match(/\d+/g))],[])
  .map(([a,b])=>a.filter(v=>b.includes(v)).length);
const copies = [...wins].map(v=>v=1).map((v,i,a)=>{for(let j=1;j<=wins[i];j++)a[i+j]+=v;return v})

console.log({
  part1: wins.reduce((s,w)=>s+~~(2**--w)), 
  part2: copies.reduce((s,c)=>s+c)
});