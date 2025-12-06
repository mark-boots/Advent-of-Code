import loadLines from '../../LoadLines.js';
const g = loadLines("input.txt").map(l => [...l]);
const H = g.length, W = g[0].length;
const calc = (arr, op) => arr.reduce((a,b)=> op === '+' ? a+ +b : a* +b, op == "+" ? 0 : 1);
let part1 = 0, part2 = 0;

for (let x = 0; x < W;) {
  if (g.every(r => r[x] === ' ')) { x++; continue; }
  let rows = Array(H-1).fill(""), cols = [];
  while (x < W && !g.every(r => r[x] === ' ')) {  
    for (let y = 0; y < H-1; y++) rows[y] += g[y][x];
    cols.unshift(g.slice(0,H-1).map(r=>r[x]).join(""));
    x++;
  }
  const op = g[H-1].slice(x-cols.length,x).find(c => "+*".includes(c));
  part1 += calc(rows, op);
  part2 += calc(cols, op);
}

console.log({ part1, part2 });