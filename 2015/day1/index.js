import loadLines from '../../LoadLines.js';
const input = loadLines("input.txt", false)


let part1 = 0, part2 = 0;
for (let i = 0; i < input.length; i++) ( part1 += input[i] === '(' ? 1 : -1, part1 == -1 && !part2 ? part2 = i + 1 : null)
console.log({ part1, part2 });