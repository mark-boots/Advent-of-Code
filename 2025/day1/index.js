import loadLines from '../../LoadLines.js';
const moves = loadLines("input.txt").map(s => (s[0]=="L"?-1:1) * s.slice(1));

let pos = 50, part1 = 0, part2 = 0;

for (const move of moves) {
  const newPos = (pos + move + 100) % 100;
  if (newPos === 0) part1++;

  part2 += move > 0
    ? Math.floor((pos + move) / 100) - Math.floor(pos / 100)
    : move < 0
      ? Math.floor((pos - 1) / 100) - Math.floor((pos + move - 1) / 100)
      : 0;

  pos = newPos;
}

console.log({ part1, part2 });
