import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt");

let pos = 50, part1 = 0, part2 = 0;
for (const move of input) {
  const rot = move.slice(1) * (move[0] == "L" ? -1 : 1)
  const nPos = (pos + rot + 100) % 100;
  part1 += nPos === 0;
  part2 += rot > 0 
    ? Math.floor((pos + rot) / 100) - Math.floor(pos / 100) 
    : Math.floor((pos - 1) / 100) - Math.floor((pos + rot - 1) / 100)
  pos = nPos;
}

console.log({ part1, part2 });
