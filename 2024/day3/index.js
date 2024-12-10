// load + prepare
import loadLines from '../../LoadLines.js';
let str = loadLines("input.txt", false)

// part 1 
const matchesPart1 = [...str.matchAll(/mul\((\d+),(\d+)\)/g)]
const part1 = matchesPart1.reduce((s, m) => s + m[1] * m[2], 0);
console.log(part1) // 192767529

// part 2
const matchesPart2 = [...str.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g)];
let enabled = true;
const part2 = matchesPart2.reduce((s, m) => {
    if (m[0] === "do()") enabled = true;
    else if (m[0] === "don't()") enabled = false;
    else if (enabled) s += m[1] * m[2];
    return s
}, 0)
console.log(part2) // 104083373